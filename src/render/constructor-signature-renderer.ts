import { Reflection, ReflectionKind, SignatureReflection } from 'typedoc/dist/lib/models';
import SignatureRenderer from './signature-renderer';
import join from '../util/join';

export default class ConstructorSignatureRenderer extends SignatureRenderer {
  public render(node: Reflection, terminationCharacter?: string): string {
    const lines: string[] = [];
    const isTypeLiteral = node.parent?.parent?.kind === ReflectionKind.TypeLiteral;
    const declarationParts: string[] = [...this.getModifiers(node, node.parent), isTypeLiteral ? 'new' : 'constructor'];

    if (node.comment) {
      this.pushIfTruthy(lines, this.renderComment(node));
    }

    const method = node as SignatureReflection;
    let declaration = join(' ', ...declarationParts);

    declaration += this.renderTypeParameters(method);
    declaration += this.renderParameters(method);

    if (isTypeLiteral) {
      declaration += this.renderReturnType(method);
    }

    if (terminationCharacter) {
      declaration += terminationCharacter;
    }

    lines.push(declaration);

    return lines.join('\n');
  }
}
