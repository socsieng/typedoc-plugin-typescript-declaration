import {
  ArrayType,
  ConditionalType,
  IndexedAccessType,
  IntersectionType,
  IntrinsicType,
  PredicateType,
  ProjectReflection,
  ReferenceType,
  Reflection,
  ReflectionKind,
  SignatureReflection,
  TupleType,
  Type,
  TypeOperatorType,
  UnionType,
  UnknownType,
} from 'typedoc/dist/lib/models';
import { DeclarationReflection } from 'typedoc';

export default class UnresolvedTypesMapper {
  private _project: ProjectReflection;
  private _knownReflectionNames: Set<string>;
  private _knownReflections: Set<Reflection>;
  private _currentReflections: Set<Reflection>;

  constructor(project: ProjectReflection) {
    this._project = project;
    this._knownReflectionNames = new Set<string>();
    this._knownReflections = new Set<Reflection>();
    this._currentReflections = new Set<Reflection>();
  }

  public clearKnownReflections() {
    this._knownReflectionNames.clear();
    this._knownReflections.clear();
  }

  public registerKnownReflection(reflection: Reflection) {
    this._knownReflections.add(reflection);
    if (reflection.kindOf(ReflectionKind.ClassOrInterface | ReflectionKind.TypeAlias | ReflectionKind.SomeModule)) {
      const namespace = reflection.getFullName('.').split('.');
      for (let i = 0; i < namespace.length; i++) {
        this._knownReflectionNames.add(namespace.slice(i).join('.'));
      }
    }
  }

  public registerKnownReflections(reflections: Reflection[]) {
    reflections.forEach(reflection => {
      this.registerKnownReflection(reflection);
    });
  }

  public resolve() {
    this._currentReflections.clear();
    Object.values(this._project.reflections).forEach(reflection => this._currentReflections.add(reflection));

    this.getReflectionsByInstanceType(this._project, DeclarationReflection).forEach(reflection => {
      reflection.extendedTypes = reflection.extendedTypes?.filter(t => this.isMapped(t));
      reflection.type = this.remapType(reflection.type);
    });

    this.getReflectionsByInstanceType(this._project, SignatureReflection).forEach(reflection => {
      reflection.type = this.remapType(reflection.type);
      reflection.parameters?.forEach(p => p.type = this.remapType(p.type));
      reflection.typeParameters?.forEach(p => p.type = this.remapType(p.type));
    });
  }

  private isKnown(type: Type) {
    if (type instanceof ReferenceType) {
      return this._knownReflectionNames.has(type.name);
    }
    return false;
  }

  private isRemoved(reflection: Reflection) {
    return this._knownReflections.has(reflection) && !this._currentReflections.has(reflection);
  }

  private isUnmapped(type: Type | undefined) {
    return  (type instanceof ReferenceType)
      && (!type.reflection || this.isRemoved(type.reflection))
      && !type.typeArguments
      && this.isKnown(type);
  }

  private isMapped(type: Type | undefined) {
    return !this.isUnmapped(type);
  }

  private remapType<T extends Type | undefined>(type: T): T extends undefined ? undefined : T;
  private remapType(type: Type | undefined) {
    if (type instanceof UnionType) {
      // filter out any unmapped types
      let mapped = type.types.filter(t => this.isMapped(t));

      // filter out null/undefined type
      let nullTypes = mapped.filter(t => (t instanceof IntrinsicType) && (t.name === 'undefined' || t.name === 'null'));

      if (mapped.length === 0 || mapped.length === nullTypes.length) {
        // remap type
        mapped = type.types.map(t => this.remapType(t));
      }
      // otherwise, do nothing, mapped already contains filtered list

      if (this.containsBoolean(type)) {
        // replace true | false with boolean
        const indexTrue = mapped.findIndex(t => t instanceof IntrinsicType && t.name === 'true');
        const indexFalse = mapped.findIndex(t => t instanceof IntrinsicType && t.name === 'false');
        const firstIndex = Math.min(indexTrue, indexFalse);
        const lastIndex = Math.max(indexTrue, indexFalse);

        mapped.splice(firstIndex, 1, new IntrinsicType('boolean'));
        mapped.splice(lastIndex, 1);
      }

      // get unique list of types from remapped types
      const unique: Type[] = [];
      mapped.forEach(item => {
        if (!unique.find(type => this.equalsWorkaround(item, type))) {
          unique.push(item);
        }
      });
      mapped = unique;

      if (mapped.length === 1) {
        return mapped[0];
      } else {
        type.types = mapped;
      }
    } else if (type instanceof IntersectionType) {
      type.types = type.types.map(t => this.remapType(t));
    } else if (type instanceof ArrayType) {
      type.elementType = this.remapType(type.elementType);
    } else if (type instanceof PredicateType) {
      type.targetType = this.remapType(type.targetType);
    } else if (type instanceof TupleType) {
      type.elements = type.elements.map(t => this.remapType(t));
    } else if (type instanceof ReferenceType && type.typeArguments) {
      type.typeArguments = type.typeArguments.map(t => this.remapType(t)!);
    } else if (type instanceof ConditionalType) {
      type.checkType = this.remapType(type.checkType);
      type.extendsType = this.remapType(type.extendsType);
      type.trueType = this.remapType(type.trueType);
      type.falseType = this.remapType(type.falseType)
    } else if ((type instanceof TypeOperatorType) && this.isUnmapped(type.target)) {
      return new UnknownType('unknown');
    } else if ((type instanceof IndexedAccessType) && this.isUnmapped(type.objectType)) {
      return new UnknownType('unknown');
    }

    return this.isUnmapped(type) ? new UnknownType('unknown') : type;
  }

  private containsBoolean(type: UnionType): boolean {
    return (
      !!type.types.find(t => t instanceof IntrinsicType && t.name === 'true')
      && !!type.types.find(t => t instanceof IntrinsicType && t.name === 'false')
    );
  }

  private getReflectionsByInstanceType<T extends Reflection>(project: ProjectReflection, func: { new(...args: any[]): T }): T[] {
    return Object.values(project.reflections).filter(r => r instanceof func) as unknown as T[];
  }

  private equalsWorkaround(type1: Type, type2: Type): boolean {
    return type1.equals(type2)
      && (
        type1 instanceof ReferenceType && type2 instanceof ReferenceType
        && ((type1.reflection ?? type1.symbolFullyQualifiedName) === (type2.reflection ?? type2.symbolFullyQualifiedName))
      );
  }
}
