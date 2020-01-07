import { Reflection, SignatureReflection } from "typedoc/dist/lib/models";
import join from '../util/join';
import TypeFormatter from "./type-formatter";
import SignatureRenderer from "./signature-renderer";

export default class GetSignatureRenderer extends SignatureRenderer {
  public render(node: Reflection, terminationCharacter?: string): string {
    const lines: string[] = [];
    const declarationParts: string[] = [
      ...this.getModifiers(node, node.parent),
      'get',
      node.parent?.name || node.name,
    ];

    if (node.comment) {
      lines.push(this.renderComment(node));
    }

    const method = node as SignatureReflection;
    let declaration = join(' ', ...declarationParts);

    declaration += this.renderTypeParameters(method);
    declaration += this.renderParameters(method);
    declaration += this.renderReturnType(method);

    if (terminationCharacter) {
      declaration += terminationCharacter;
    }

    lines.push(declaration);

    return lines.join('\n');
  }
}
