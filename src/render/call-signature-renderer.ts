import { Reflection, SignatureReflection, ReflectionKind } from "typedoc/dist/lib/models";
import join from '../util/join';
import SignatureRenderer from "./signature-renderer";

export default class CallSignatureRenderer extends SignatureRenderer {
  public render(node: Reflection): string {
    const lines: string[] = [];
    const declarationParts: string[] = [
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
    declaration += ';';

    lines.push(declaration);

    return lines.join('\n');
  }
}
