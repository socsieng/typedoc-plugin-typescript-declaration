import Renderer from "./renderer";
import { Reflection, ParameterReflection, ReflectionType } from "typedoc/dist/lib/models";
import join from '../util/join';
import TypeFormatter from "./type-formatter";

export default class ParameterRenderer extends Renderer {
  public render(node: Reflection): string {
    const p = node as ParameterReflection;
    let declaration = `${p.flags.isRest ? '...' : ''}${this.getName(p)}${p.flags.isOptional ? '?' : ''}${p.type ? `: ${TypeFormatter.format(p.type, {
      isOptionalType: p.flags.isOptional,
      includeConstraints: false,
    } )}` : ''}`;
    return declaration;
  }

  private getName(parameter: ParameterReflection): string {
    const type = parameter.type as ReflectionType;
    if (parameter.name === '__namedParameters') {
      if (type.declaration?.children) {
        return join(' ', '{', type.declaration.children.map(c => c.name).join(', ') , '}');
      }
      if (parameter.originalName) {
        const origMatch = /^__(\d+)$/.exec(parameter.originalName);
        if (origMatch) {
          const origNumber = parseInt(origMatch[1], 10);
          return `__param${origNumber + 1}`;
        }
      }
    }
    return parameter.name;
  }
}
