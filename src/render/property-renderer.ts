import Renderer from "./renderer";
import { Reflection, DeclarationReflection } from "typedoc/dist/lib/models";
import join from '../util/join';
import TypeFormatter from "./type-formatter";

export default class PropertyRenderer extends Renderer {
  public render(node: Reflection, terminationCharacter?: string): string {
    const lines: string[] = [];
    const declarationParts: string[] = [...this.getModifiers(node), `${this.encodeName(node.name)}${node.flags.isOptional ? '?' : ''}`];

    if (node.comment) {
      lines.push(this.renderComment(node));
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
