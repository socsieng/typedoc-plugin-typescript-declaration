import { Reflection, ReflectionKind, SignatureReflection } from 'typedoc/dist/lib/models';
import join from '../util/join';

export default class CommentRenderer {
  public render(node: Reflection): string {
    let lines: string[] = [];
    const sections: string[] = [];
    const comment = node.comment;

    if (comment) {
      if (comment.shortText) {
        sections.push(this.renderMultilineComment('', comment.shortText));
      }

      if (comment.text) {
        sections.push(this.renderMultilineComment('', comment.text));
      }

      if (node.kind === ReflectionKind.Event) {
        sections.push(' * @event');
      }

      const signature = node as SignatureReflection;
      const paramsSection: string[] = [];
      if (signature.parameters) {
        const paramComments = signature.parameters
          .filter(p => p.comment?.text)
          .map(p => this.renderMultilineComment(`@param ${p.name}`, p.comment!.text!))
          .join('\n');

        if (paramComments.length) {
          paramsSection.push(paramComments);
        }
      }

      if (comment.returns) {
        paramsSection.push(this.renderMultilineComment('@returns', comment.returns));
      }

      if (paramsSection.length) {
        sections.push(paramsSection.join('\n'));
      }

      if (comment.tags?.length) {
        sections.push(
          comment.tags
            .map(t => this.renderMultilineComment(`@${t.tagName}`, t.text))
            .join('\n')
        );
      }

      if (sections.length) {
        lines.push(sections.join('\n *\n'));
      }
    }

    if (lines.length) {
      lines = ['/**', ...lines, ' */'];
    }

    return lines.join('\n');
  }

  private renderMultilineComment(prefix: string, comment: string): string {
    const [firstLine, ...remainingLines] = comment.replace(/\n$/, '').split(/\n/gm);
    return ` * ${join(' ', prefix, firstLine || '')}${remainingLines?.length
      ? `\n${remainingLines.map(l => ` * ${l}`.trimRight()).join('\n')}`
      : ''}`;
  }
}
