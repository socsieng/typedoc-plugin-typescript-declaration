import { Reflection, ReflectionKind, SignatureReflection } from 'typedoc/dist/lib/models';
import SignatureRenderer from './signature-renderer';
import join from '../util/join';

export default class CallSignatureRenderer extends SignatureRenderer {
  public render(node: Reflection, terminationCharacter?: string): string {
    const lines: string[] = [];
    const declarationParts: string[] = [
      this.isTop(node) ? 'declare' : (node.flags.isExported || node.parent?.flags.isExported) && node.parent?.kind === ReflectionKind.Function ? 'export' : '',
      ...this.getModifiers(node, node.parent),
      node.parent?.kind === ReflectionKind.Function ? 'function' : '',
      node.parent?.kind === ReflectionKind.TypeLiteral ? '' : node.name,
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
