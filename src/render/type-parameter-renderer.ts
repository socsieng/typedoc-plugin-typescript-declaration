import Renderer from "./renderer";
import { Reflection, TypeParameterReflection } from "typedoc/dist/lib/models";
import TypeFormatter from "./type-formatter";

export default class TypeParameterRenderer extends Renderer {
  public render(node: Reflection): string {
    const p = node as TypeParameterReflection;
    let declaration = p.name;
    if (p.type) {
      declaration += ` extends ${TypeFormatter.format(p.type)}`;
    }
    return declaration;
  }
}
