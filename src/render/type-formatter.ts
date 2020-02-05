import {
ArrayType,
ConditionalType,
IndexedAccessType,
IntersectionType,
IntrinsicType,
PredicateType,
QueryType,
ReferenceType,
ReflectionType,
StringLiteralType,
TupleType,
Type,
TypeOperatorType,
TypeParameterType,
UnionType,
} from 'typedoc/dist/lib/models';
import ReflectionFormatter from './reflection-formatter';

interface TypeFormatterOptions {
  isOptionalType?: boolean;
  includeConstraints?: boolean;
}

const defaultOptions: TypeFormatterOptions = {
  isOptionalType: false,
  includeConstraints: true,
};

export default class TypeFormatter {
  public static format(type: Type, options?: TypeFormatterOptions): string {
    const mergedOptions = {
      ...defaultOptions,
      ...options,
    }

    if (type.type === 'array') {
      return `${TypeFormatter.format((type as ArrayType).elementType)}[]`;
    }

    if (type.type === 'conditional') {
      const conType = type as ConditionalType;
      return `${TypeFormatter.format(conType.checkType)} extends ${TypeFormatter.format(conType.extendsType)} ? ${TypeFormatter.format(conType.trueType)} : ${TypeFormatter.format(conType.falseType)}`;
    }

    if (type.type === 'indexedAccess') {
      const indexType = type as IndexedAccessType;
      return `${TypeFormatter.format(indexType.objectType)}[${TypeFormatter.format(indexType.indexType)}]`;
    }

    if (type.type === 'intersection') {
      return (type as IntersectionType).types.map(t => TypeFormatter.format(t)).join(' & ');
    }

    if (type.type === 'predicate') {
      const predType = type as PredicateType;
      if (predType.targetType) {
        return `${predType.name} is ${TypeFormatter.format(predType.targetType)}`;
      }
    }

    if (type.type === 'reference') {
      const refType = type as ReferenceType;
      let declaration = refType.name;

      if (refType.typeArguments) {
        declaration += `<${refType.typeArguments.map(t => TypeFormatter.format(t)).join(', ')}>`;
      }

      if (declaration === '__type') {
        declaration = '{}';
      }

      return declaration;
    }

    if (type.type === 'reflection') {
      const refType = type as ReflectionType;
      return ReflectionFormatter.instance().render(refType.declaration);
    }

    if (type.type === 'stringLiteral') {
      return JSON.stringify((type as StringLiteralType).value);
    }

    if (type.type === 'tuple') {
      return `[${(type as TupleType).elements.map(t => TypeFormatter.format(t)).join(', ')}]`;
    }

    if (type.type === 'typeOperator') {
      const typeOperatorType = type as TypeOperatorType;
      return `${typeOperatorType.operator} ${TypeFormatter.format(typeOperatorType.target)}`;
    }

    if (type.type === 'typeParameter') {
      const typeParamType = type as TypeParameterType;
      if (typeParamType.constraint && mergedOptions.includeConstraints) {
        return `${typeParamType.name} extends ${TypeFormatter.format(typeParamType.constraint)}`;
      }
    }

    if (type.type === 'union') {
      return (type as UnionType).types
        .filter(t => {
          const intrinsicType = t as IntrinsicType;
          return !mergedOptions.isOptionalType || !(intrinsicType.type === 'intrinsic' && intrinsicType.name === 'undefined');
        })
        .map(t => TypeFormatter.format(t)).join(' | ');
    }

    if (type.type === 'query') {
      return `typeof ${TypeFormatter.format((type as QueryType).queryType)}`;
    }

    const other = type as any;
    if (other.name) {
      return other.name;
    }

    throw(`Unrecognised type: ${type.type}`);
  }
}
