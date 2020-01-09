import { DeclarationReflection, Reflection } from 'typedoc/dist/lib/models';
import ReflectionFormatter, { ReflectionSortFlags, sortMapping } from './reflection-formatter';
import ReflectionRenderer from './reflection-renderer';
import TypeFormatter from './type-formatter';
import join from '../util/join';
import { propertySorter } from '../util/sort';

export default class ContainerRenderer extends ReflectionRenderer {
  private _type: string;

  constructor(type: string) {
    super();

    this._type = type;
  }

  public render(node: Reflection): string {
    const lines: string[] = [];
    const declarationParts: string[] = [
      this.isTop(node) ? 'declare' : node.flags.isExported ? 'export' : '',
      ...this.getModifiers(node), this._type, `${node.name}${this.renderTypeParameters(node as DeclarationReflection)}`
    ];

    if (node.comment) {
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

    const body = this.renderBody(declarationNode);
    if (body) {
      lines.push(body);
    }

    lines.push('}');

    return lines.join('\n');
  }

  protected renderBody(declarationNode: DeclarationReflection, indentBy: number = 1): string {
    let sorter: (a: Reflection, b: Reflection) => number;

    const isGroupType = !!['module', 'project'].find(type => type === this._type);
    const insertBlankLine = !!['class', 'module', 'interface', 'project'].find(type => type === this._type);

    sorter = propertySorter(node => node.id);

    if ((isGroupType && this.isSortFlag(declarationNode, ReflectionSortFlags.container))
      ||!isGroupType && this.isSortFlag(declarationNode, ReflectionSortFlags.leaf)) {
      sorter = propertySorter(node => node.name);
    }

    if (declarationNode.children) {
      const members = declarationNode.children
        .filter(node => !node.inheritedFrom)
        .filter(node => {
          const ownedSources = node.sources?.filter(s => !/^node_modules\//i.test(s.fileName));
          return !node.sources || ownedSources?.length !== 0;
        })
        .sort(sorter)
        .map(node => ReflectionFormatter.instance().render(node, ';'))
        .filter(s => s)
        .join(insertBlankLine ? '\n\n' : '\n');

      const indent = this._indentor.getIndent(indentBy);

      if (indent) {
        return members.split(/\r?\n(?=.)/gm).map(l => `${indent}${l}`).join('\n');
      }
      return members;
    }

    return '';
  }

  protected renderTypeParameters(node: DeclarationReflection): string {
    if (node.typeParameters) {
      return `<${node.typeParameters.map(p => ReflectionFormatter.instance().render(p)).join(', ')}>`;
    }
    return '';
  }

  private isSortFlag(node: Reflection, flag: ReflectionSortFlags): boolean;
  private isSortFlag(node: Reflection, ...flags: ReflectionSortFlags[]): boolean;
  private isSortFlag(node: Reflection, ...flags: ReflectionSortFlags[]) {
    return !!flags.find(flag => (this.getSortOption(node) & flag) === flag);
  }

  private getSortOption(node: Reflection) {
    let current: Reflection | undefined = node;
    let sort = '';

    while (current) {
      sort = this.getTag(current, 'sortoption')?.text.trim() || '';
      if (sort) {
        break;
      }
      current = current.parent;
    }

    return sortMapping[sort] || ReflectionFormatter.sortOption;
  }
}
