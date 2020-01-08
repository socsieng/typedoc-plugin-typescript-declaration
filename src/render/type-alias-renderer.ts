import { DeclarationReflection, Reflection, ReflectionType } from 'typedoc/dist/lib/models';
import ReflectionFormatter from './reflection-formatter';
import ReflectionRenderer from './reflection-renderer';
import TypeFormatter from './type-formatter';
import join from '../util/join';
import { propertySorter } from '../util/sort';

export default class TypeAliasRenderer extends ReflectionRenderer {
  public render(node: Reflection, terminationCharacter?: string): string {
    const lines: string[] = [];
    const declarationParts: string[] = [
      this.isTop(node) ? 'declare' : node.flags.isExported ? 'export' : '',
      ...this.getModifiers(node),
      'type',
      node.name,
      '='
    ];

    if (node.comment)
    {
      lines.push(this.renderComment(node));
    }

    const declarationNode = node as DeclarationReflection;

    // body
    const type = declarationNode.type as ReflectionType;
    if (type.declaration?.children) {
      lines.push(join(' ', ...declarationParts, '{'));

      const indent = this._indentor.getIndent(1);
      const members = type.declaration.children
        .sort(propertySorter(node => node.id))
        .map(node => ReflectionFormatter.instance().render(node, ';'));
      lines.push(...members.map(block => block.split(/\r?\n(?=.)/gm).map(l => `${indent}${l}`).join('\n')));

      lines.push('}');
    } else if (type) {
      lines.push(join(' ', ...declarationParts, `${TypeFormatter.format(type)}${terminationCharacter}`));
    }

    return lines.join('\n');
  }
}
