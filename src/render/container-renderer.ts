import ReflectionRenderer from "./reflection-renderer";
import { Reflection, DeclarationReflection, ReflectionKind } from "typedoc/dist/lib/models";
import join from '../util/join';
import TypeFormatter from "./type-formatter";
import ReflectionFormatter from "./reflection-formatter";
import { propertySorter } from "../util/sort";

export default class ContainerRenderer extends ReflectionRenderer {
  private _type: string;

  constructor(type: string) {
    super();

    this._type = type;
  }

  public render(node: Reflection): string {
    const lines: string[] = [];
    const declarationParts: string[] = [
      this.isTop(node) ? 'declare' : '',
      ...this.getModifiers(node), this._type, `${node.name}${this.renderTypeParameters(node as DeclarationReflection)}`
    ];

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
      const members = declarationNode.children
        .filter(node => !node.inheritedFrom)
        .filter(node => {
          const ownedSources = node.sources?.filter(s => !/^node_modules\//i.test(s.fileName));
          return !node.sources || ownedSources?.length !== 0;
        })
        .sort(propertySorter(node => node.id))
        .map(node => ReflectionFormatter.instance().render(node, ';'))
        .join(['class', 'module', 'interface'].find(type => type === this._type) ? '\n\n' : '\n');

      const indent = this._indentor.getIndent(1);
      lines.push(members.split(/\r?\n(?=.)/gm).map(l => `${indent}${l}`).join('\n'));
    }

    lines.push('}');

    return lines.join('\n');
  }

  protected renderTypeParameters(node: DeclarationReflection): string {
    if (node.typeParameters) {
      return `<${node.typeParameters.map(p => ReflectionFormatter.instance().render(p)).join(', ')}>`;
    }
    return '';
  }
}
