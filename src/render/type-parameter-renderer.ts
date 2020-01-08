import { Reflection, TypeParameterReflection } from 'typedoc/dist/lib/models';
import ReflectionRenderer from './reflection-renderer';
import TypeFormatter from './type-formatter';

export default class TypeParameterRenderer extends ReflectionRenderer {
  public render(node: Reflection): string {
    const p = node as TypeParameterReflection;
    let declaration = p.name;
    if (p.type) {
      declaration += ` extends ${TypeFormatter.format(p.type)}`;
    }
    return declaration;
  }
}
