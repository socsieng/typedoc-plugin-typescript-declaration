import Renderer from "./renderer";
import { SignatureReflection, ReflectionKind } from "typedoc/dist/lib/models";
import TypeFormatter from "./type-formatter";

export default abstract class SignatureRenderer extends Renderer {
  protected renderTypeParameters(method: SignatureReflection): string {
    if (method.typeParameters) {
      return `<${method.typeParameters.map(p => TypeFormatter.format(p.type!))}>`;
    }
    return '';
  }

  protected renderParameters(method: SignatureReflection): string {
    let declaration = '(';
    if (method.parameters) {
      declaration += method.parameters.map(p => `${p.flags.isRest ? '...' : ''}${p.name}${p.flags.isOptional ? '?' : ''}${p.type ? `: ${TypeFormatter.format(p.type)}` : ''}`).join(', ');
    }
    declaration += ')';
    return declaration;
  }

  protected renderReturnType(method: SignatureReflection): string {
    if (method.type) {
      return `${method.parent?.kind === ReflectionKind.TypeLiteral ? ' =>': ':'} ${TypeFormatter.format(method.type)}`;
    }
    return '';
  }
}
