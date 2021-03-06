import { DeclarationReflection, Reflection } from 'typedoc/dist/lib/models';
import ReflectionRenderer from './reflection-renderer';
import TypeFormatter from './type-formatter';
import join from '../util/join';

export default class PropertyRenderer extends ReflectionRenderer {
  public render(node: Reflection, terminationCharacter?: string): string {
    const lines: string[] = [];
    const declarationParts: string[] = [...this.getModifiers(node), `${this.encodeName(node.name)}${node.flags.isOptional ? '?' : ''}`];

    if (node.comment) {
      this.pushIfTruthy(lines, this.renderComment(node));
    }

    const member = node as DeclarationReflection;
    let declaration = join(' ', ...declarationParts);

    if (member.type) {
      declaration += `: ${TypeFormatter.format(member.type, { isOptionalType: node.flags.isOptional })}`;
    }

    if (terminationCharacter) {
      declaration += terminationCharacter;
    }

    lines.push(declaration);

    return lines.join('\n');
  }
}
