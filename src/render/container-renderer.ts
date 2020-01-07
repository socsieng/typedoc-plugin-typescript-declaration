import Renderer from "./renderer";
import { Reflection, DeclarationReflection } from "typedoc/dist/lib/models";
import join from '../util/join';
import TypeFormatter from "./type-formatter";
import ReflectionFormatter from "./reflection-formatter";
import { propertySorter } from "../util/sort";

export default class ContainerRenderer extends Renderer {
  private _type: string;

  constructor(type: string) {
    super();

    this._type = type;
  }

  public render(node: Reflection): string {
    const lines: string[] = [];
    const declarationParts: string[] = [...this.getModifiers(node), this._type, node.name];

    if (node.comment)
    {
      lines.push(this.renderComment(node));
    }

    const declarationNode = node as DeclarationReflection;
    if (declarationNode.extendedTypes) {
      if (declarationNode.extendedTypes.length >= 1) {
        declarationParts.push('extends', TypeFormatter.format(declarationNode.extendedTypes[0]));

        if (declarationNode.extendedTypes.length > 1) {
          declarationParts.push('implements', declarationNode.extendedTypes.slice(1).map(t => TypeFormatter.format(t)).join(', '));
        }
      }
    }

    lines.push(join(' ', ...declarationParts, '{'));

    // body
    if (declarationNode.children) {
      const indent = this._indentor.getIndent(1);
      const members = declarationNode.children
        .sort(propertySorter(node => node.id))
        .map(node => ReflectionFormatter.instance().render(node));
      lines.push(...members.map(block => block.split(/\r?\n(?=.)/gm).map(l => `${indent}${l}`).join('\n')));
    }

    lines.push('}');

    return lines.join('\n');
  }
}
