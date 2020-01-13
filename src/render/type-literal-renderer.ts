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

    if (node.comment) {
      this.pushIfTruthy(lines, this.renderComment(node));
    }

    const member = node as DeclarationReflection;

    if (member.children) {
      if (node.parent?.kind === ReflectionKind.TypeAlias) {
        const body = this.renderBody(member, 1, ',');
        if (body) {
          lines.push('{', body, '}');
        }
      } else {
        lines.push(join(' ', '{', member.children.map(c => ReflectionFormatter.instance().render(c)).join(', '), '}'));
      }
    }

    if (member.signatures) {
      lines.push(ReflectionFormatter.instance().render(member.signatures[0]));
    }

    return lines.join('\n');
  }
}
