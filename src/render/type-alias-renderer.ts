import Renderer from "./renderer";
import { Reflection, DeclarationReflection, ReflectionType } from "typedoc/dist/lib/models";
import ReflectionFormatter from "./reflection-formatter";
import TypeFormatter from "./type-formatter";
import join from "../util/join";
import { propertySorter } from "../util/sort";

export default class TypeAliasRenderer extends Renderer {
  public render(node: Reflection): string {
    const lines: string[] = [];
    const declarationParts: string[] = [...this.getModifiers(node), 'type', node.name, '='];

    if (node.comment)
    {
      lines.push(this.renderComment(node));
    }

    const declarationNode = node as DeclarationReflection;

    lines.push(join(' ', ...declarationParts, '{'));

    // body
    const type = declarationNode.type as ReflectionType;
    if (type.declaration.children) {
      const indent = this._indentor.getIndent(1);
      const members = type.declaration.children
        .sort(propertySorter(node => node.id))
        .map(node => `${ReflectionFormatter.instance().render(node)};`);
      lines.push(...members.map(block => block.split(/\r?\n(?=.)/gm).map(l => `${indent}${l}`).join('\n')));
    }

    lines.push('}');

    return lines.join('\n');
  }
}
