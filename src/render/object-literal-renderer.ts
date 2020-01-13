import { DeclarationReflection, Reflection } from 'typedoc/dist/lib/models';
import ContainerRenderer from './container-renderer';
import join from '../util/join';

export default class ObjectLiteralRenderer extends ContainerRenderer {
  constructor() {
    super('object_literal');
  }

  public render(node: Reflection, terminationCharacter?: string): string {
    const lines: string[] = [];
    const declarationParts: string[] = [
      this.isTop(node) ? 'declare' : '',
      ...this.getModifiers(node),
      `${node.name}:`,
    ];

    if (node.comment)
    {
      lines.push(this.renderComment(node));
    }

    const declarationNode = node as DeclarationReflection;

    lines.push(join(' ', ...declarationParts, '{'));

    const body = this.renderBody(declarationNode, 1, ',');
    if (body) {
      lines.push(body);
    }

    lines.push('};');

    return lines.join('\n');
  }

  protected getModifiers(node: Reflection, parent?: Reflection): string[] {
    let modifiers = super.getModifiers(node, parent);

    if (!modifiers.find(m => m === 'const' || m === 'let')) {
      modifiers = [...modifiers, 'var'];
    }

    return modifiers;
  }
}
