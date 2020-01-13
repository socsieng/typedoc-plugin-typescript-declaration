import { Reflection, SignatureReflection } from 'typedoc/dist/lib/models';
import SignatureRenderer from './signature-renderer';
import join from '../util/join';

export default class IndexSignatureRenderer extends SignatureRenderer {
  public render(node: Reflection, terminationCharacter?: string): string {
    const lines: string[] = [];
    const declarationParts: string[] = [
      ...this.getModifiers(node, node.parent),
    ];

    if (node.comment) {
      this.pushIfTruthy(lines, this.renderComment(node));
    }

    const method = node as SignatureReflection;
    let declaration = join(' ', ...declarationParts);

    declaration += this.renderParameters(method).replace(/^\(/, '[').replace(/\)$/, ']');
    declaration += this.renderReturnType(method);

    if (terminationCharacter) {
      declaration += terminationCharacter;
    }

    lines.push(declaration);

    return lines.join('\n');
  }
}
