import Renderer from "./renderer";
import { Reflection, DeclarationReflection, ReflectionFlag } from "typedoc/dist/lib/models";
import ReflectionFormatter from "./reflection-formatter";
import join from "../util/join";

export default class AccessorRenderer extends Renderer {
  public render(node: Reflection, terminationCharacter?: string): string {
    const method = node as DeclarationReflection;
    return join(
      '\n',
      ReflectionFormatter.instance().render(method.getSignature!, terminationCharacter),
      ReflectionFormatter.instance().render(method.setSignature!, terminationCharacter),
    );
  }
}
