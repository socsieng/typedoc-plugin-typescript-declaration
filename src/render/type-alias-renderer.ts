import { DeclarationReflection, Reflection, ReflectionType } from 'typedoc/dist/lib/models';
import ContainerRenderer from './container-renderer';
import TypeFormatter from './type-formatter';
import join from '../util/join';

export default class TypeAliasRenderer extends ContainerRenderer {
  constructor() {
    super('type_alias');
  }

  public render(node: Reflection, terminationCharacter?: string): string {
    const lines: string[] = [];
    const declarationParts: string[] = [
      this.isTop(node) ? 'declare' : node.flags.isExported ? 'export' : '',
      ...this.getModifiers(node),
      'type',
      node.name,
      '='
    ];

    if (node.comment)
    {
      lines.push(this.renderComment(node));
    }

    const declarationNode = node as DeclarationReflection;

    // body
    const type = declarationNode.type as ReflectionType;
    if (type.declaration?.children) {
      lines.push(join(' ', ...declarationParts, '{'));

      const body = this.renderBody(type.declaration);
      if (body) {
        lines.push(body);
      }

      lines.push('}');
    } else if (type) {
      lines.push(join(' ', ...declarationParts, `${TypeFormatter.format(type)}${terminationCharacter}`));
    }

    return lines.join('\n');
  }
}
