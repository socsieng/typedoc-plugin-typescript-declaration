import ReflectionRenderer from "./reflection-renderer";
import { SignatureReflection, ReflectionKind } from "typedoc/dist/lib/models";
import TypeFormatter from "./type-formatter";
import ReflectionFormatter from "./reflection-formatter";

export default abstract class SignatureRenderer extends ReflectionRenderer {
  protected renderTypeParameters(method: SignatureReflection): string {
    if (method.typeParameters) {
      return `<${method.typeParameters.map(p => ReflectionFormatter.instance().render(p)).join(', ')}>`;
    }
    return '';
  }

  protected renderParameters(method: SignatureReflection): string {
    let declaration = '(';
    if (method.parameters) {
      declaration += method.parameters.map(p => ReflectionFormatter.instance().render(p)).join(', ');
    }
    declaration += ')';
    return declaration;
  }

  protected renderReturnType(method: SignatureReflection): string {
    if (method.type) {
      return `${method.parent?.kind === ReflectionKind.TypeLiteral ? ' =>': ':'} ${TypeFormatter.format(method.type, { includeConstraints: false })}`;
    }
    return '';
  }
}
