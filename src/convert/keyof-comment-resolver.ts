import {
  Comment,
  CommentTag,
  DeclarationReflection,
  ProjectReflection,
  ReferenceType,
  Reflection,
  ReflectionKind,
  ReflectionType,
  Type,
  TypeOperatorType,
} from 'typedoc/dist/lib/models';
import { propertySorter } from '../util/sort';

export default class KeyOfCommentResolver {
  public resolveKeys(project: ProjectReflection, reflection: Reflection, override: boolean = false) {
    const node = reflection as DeclarationReflection;
    const type = node.type as TypeOperatorType;
    const reference = this.getDeclaration(project, type.target);

    let keys = this.getKeys(reference)
      .sort(propertySorter(r => r.id))
      .map(r => type.target?.type === 'reference' ? `[[${(type.target as ReferenceType)?.name}.${r.name}|\`${r.name}\`]]` : `\`${r.name}\``)
      .join(', ');

    if (!node.comment) {
      node.comment = new Comment();
    }

    if (!node.comment.tags) {
      node.comment.tags = [];
    }

    let tag = node.comment?.tags?.find(t => t.tagName === 'keys');
    if (tag) {
      if (override) {
        tag.text = keys;
      }
    } else {
      tag = new CommentTag('keys', undefined, keys);
      node.comment.tags.push(tag);
    }
  }

  public shouldResolveKeys(project: ProjectReflection, reflection: Reflection) {
    const node = reflection as DeclarationReflection;

    if (node.kind === ReflectionKind.TypeAlias) {
      const type = node.type as TypeOperatorType;

      if (type?.type === 'typeOperator' && type?.operator === 'keyof' && type?.target) {
        const reference = this.getDeclaration(project, type.target);

        if (this.getKeys(reference)) {
          return true;
        }
      }
    }

    return false;
  }

  private getDeclaration(project: ProjectReflection, type: Type) {
    let reference: DeclarationReflection | undefined;

    if (type.type === 'reference') {
      const targetType = type as ReferenceType;
      reference = project.findReflectionByName(targetType.name) as DeclarationReflection;
    } else if (type.type === 'reflection') {
      const reflectionType = type as ReflectionType;
      reference = reflectionType.declaration;
    }

    return reference;
  }

  private getKeys(reflection?: DeclarationReflection): Reflection[] {
    return reflection?.children
      || (reflection?.type as ReflectionType)?.declaration?.children
      || [];
  }

  private static _instance: KeyOfCommentResolver;
  public static instance() {
    if (!KeyOfCommentResolver._instance) {
      KeyOfCommentResolver._instance = new KeyOfCommentResolver();
    }
    return KeyOfCommentResolver._instance;
  }
}