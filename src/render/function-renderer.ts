import Renderer from "./renderer";
import { Reflection, DeclarationReflection } from "typedoc/dist/lib/models";
import ReflectionFormatter from "./reflection-formatter";

export default class FunctionRenderer extends Renderer {
  public render(node: Reflection): string {
    const method = node as DeclarationReflection;
    const lines: string[] = method.signatures!
      .map(s => ReflectionFormatter.instance().render(s));

    return lines.join('\n');
  }
}
