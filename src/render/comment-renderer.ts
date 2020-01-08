import ReflectionRenderer from "./reflection-renderer";
import { Reflection, SignatureReflection } from "typedoc/dist/lib/models";
import join from '../util/join';

export default class CommentRenderer {
  public render(node: Reflection): string {
    const lines: string[] = [];
    const sections: string[] = [];
    const comment = node.comment;

    if (comment) {
      lines.push(`/**`);
      if (comment.shortText) {
        sections.push(
          comment.shortText.replace(/\n$/g, '')
            .split(/\n/gm)
            .map(l => ` * ${l}`)
            .join('\n')
        );
      }

      if (comment.text) {
        sections.push(
          comment.text.replace(/\n$/g, '')
            .split(/\n/gm)
            .map(l => ` * ${l}`)
            .join('\n')
        );
      }

      const signature = node as SignatureReflection;
      if (signature.parameters) {
        const paramComments = signature.parameters
          .filter(p => p.comment?.text)
          .map(p => ` * @param ${join(' ', p.name,
            p.comment?.text?.replace(/\n$/m, '')
            ?.replace(/\n/gm, `\n * `) || '')}`)
          .join('\n');

        if (paramComments.length) {
          sections.push(paramComments);
        }
      }

      if (comment.tags) {
        sections.push(
          comment.tags
            .map(t => ` * ${join(' ', `@${t.tagName}`, t.paramName, t.text?.replace(/\n$/m, ''))}`)
            .join('\n')
        );
      }
      lines.push(sections.join(`\n *\n`));
      lines.push(` */`);
    }
    return lines.join('\n');
  }
}
