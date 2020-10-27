import { DeclarationReflection, Reflection, ReflectionKind } from 'typedoc/dist/lib/models';
import ContainerRenderer from './container-renderer';
import ReflectionFormatter from './reflection-formatter';
import join from '../util/join';

export default class TypeLiteralRenderer extends ContainerRenderer {
  constructor() {
    super('type_literal');
  }

  public render(node: Reflection): string {
    const lines: string[] = [];
    const member = node as DeclarationReflection;
    let indent = false;

    if (member.signatures && member.signatures[0]?.comment) {
      indent = true;
    } else if (node.comment) {
      this.pushIfTruthy(lines, this.renderComment(node));
    }

    if (member.children || member.indexSignature) {
      const children = [...(member.children || []), member.indexSignature].filter(c => c);
      if (node.parent?.kind === ReflectionKind.TypeAlias) {
        const body = this.renderBody(member, 1, ',');
        if (body) {
          lines.push('{', body, '}');
        }
      } else {
        lines.push(join(' ', '{', children.map(c => ReflectionFormatter.instance().render(c)).join(', '), '}'));
      }
    } else if (member.signatures) {
      let signature = ReflectionFormatter.instance().render(member.signatures[0]);
      if (indent) {
        lines.push('');
        signature = signature.split('\n').map(l => `${this._indentor.getIndent(1)}${l}`).join('\n');
      }
      lines.push(signature);
    } else if (member.name === '__type') {
      lines.push('{}');
    }

    return lines.join('\n');
  }
}
