import { DeclarationReflection, Reflection } from 'typedoc/dist/lib/models';
import ReflectionRenderer from './reflection-renderer';
import join from '../util/join';

export default class EnumMemberRenderer extends ReflectionRenderer {
  public render(node: Reflection): string {
    const lines: string[] = [];
    const declarationParts: string[] = [...this.getModifiers(node), node.name];

    if (node.comment) {
      lines.push(this.renderComment(node));
    }

    const member = node as DeclarationReflection;
    let declaration = join(' ', ...declarationParts);

    if (member.defaultValue) {
      declaration += ` = ${member.defaultValue}`;
    }

    declaration += ',';

    lines.push(declaration);

    return lines.join('\n');
  }
}
