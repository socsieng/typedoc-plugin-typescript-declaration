import { ReflectionKind, SignatureReflection } from 'typedoc/dist/lib/models';
import ReflectionFormatter from './reflection-formatter';
import ReflectionRenderer from './reflection-renderer';
import TypeFormatter from './type-formatter';

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
