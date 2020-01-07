import Renderer from "./renderer";
import { Reflection, DeclarationReflection } from "typedoc/dist/lib/models";
import ReflectionFormatter from "./reflection-formatter";
import join from "../util/join";

export default class TypeLiteralRenderer extends Renderer {
  public render(node: Reflection): string {
    const lines: string[] = [];

    if (node.comment) {
      lines.push(this.renderComment(node));
    }

    const member = node as DeclarationReflection;

    if (member.children) {
      const declarationParts: string[] = [];

      lines.push(join(' ', '{', member.children.map(c => ReflectionFormatter.instance().render(c)).join(', '), '}'));
    }

    if (member.signatures) {
      lines.push(ReflectionFormatter.instance().render(member.signatures[0]));
    }

    return lines.join('\n');
  }
}
