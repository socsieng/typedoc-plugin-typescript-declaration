import { Reflection, SignatureReflection } from 'typedoc/dist/lib/models';
import join from '../util/join';

export default class CommentRenderer {
  public render(node: Reflection): string {
    const lines: string[] = [];
    const sections: string[] = [];
    const comment = node.comment;

    if (comment) {
      lines.push('/**');
      if (comment.shortText) {
        sections.push(
          comment.shortText.replace(/\n$/, '')
            .split(/\n/gm)
            .map(l => ` * ${l}`.trimRight())
            .join('\n')
        );
      }

      if (comment.text) {
        sections.push(
          comment.text.replace(/\n$/, '')
            .split(/\n/gm)
            .map(l => ` * ${l}`.trimRight())
            .join('\n')
        );
      }

      const signature = node as SignatureReflection;
      if (signature.parameters) {
        const paramComments = signature.parameters
          .filter(p => p.comment?.text)
          .map(p => {
            const [firstLine, ...remainingLines] = p.comment!.text!.replace(/\n$/, '').split(/\n/gm);
            return ` * @param ${join(' ', p.name, firstLine || '')}${remainingLines?.length
              ? `\n${remainingLines.map(l => ` * ${l}`.trimRight()).join('\n')}`
              : ''}`;
          })
          .join('\n');

        if (paramComments.length) {
          sections.push(paramComments);
        }
      }

      if (comment.tags?.length) {
        sections.push(
          comment.tags
            .map(t => ` * ${join(' ', `@${t.tagName}`, t.paramName, t.text?.replace(/\n$/m, ''))}`)
            .join('\n')
        );
      }
      lines.push(sections.join('\n *\n'));
      lines.push(' */');
    }
    return lines.join('\n');
  }
}
