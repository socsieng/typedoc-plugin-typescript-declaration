import { DeclarationReflection, Reflection, ReflectionKind } from 'typedoc/dist/lib/models';
import ContainerRenderer from './container-renderer';
import join from '../util/join';

export default class ModuleRenderer extends ContainerRenderer {
  constructor() {
    super('module');
  }

  public render(node: Reflection): string {
    if (this.isNamespace(node)) {
      let renderNode = node as DeclarationReflection;
      const nodeNames: string[] = [];
      let latestComment: string | undefined;
      let currentComment: string | undefined;

      do {
        currentComment = this.renderComment(renderNode);

        // cannot combine modules into namespace because comments differ
        if (latestComment && currentComment && latestComment !== currentComment) {
          break;
        }

        if (currentComment) {
          latestComment = currentComment;
        }

        nodeNames.push(renderNode.name);
        if (renderNode.children?.length === 1 && renderNode.children[0].kindOf(ReflectionKind.SomeModule)) {
          const nextNode = renderNode.children[0];
          const nextComment = this.renderComment(nextNode);

          // cannot combine modules into namespace because comments differ
          if (latestComment && nextComment && latestComment !== nextComment) {
            break;
          }

          renderNode = nextNode;
        } else {
          break;
        }
      } while (this.isNamespace(renderNode));

      const lines: string[] = [];
      const declarationParts: string[] = [
        this.isTop(node) ? 'declare' : '',
        'namespace', `${nodeNames.join('.')}`
      ];

      if (latestComment) {
        this.pushIfTruthy(lines, latestComment);
      }

      lines.push(join(' ', ...declarationParts, '{'));

      const body = this.renderBody(renderNode);
      if (body) {
        lines.push(body);
      }

      lines.push('}');

      return lines.join('\n');
    }

    return super.render(node);
  }

  private isNamespace(node: Reflection) {
    const hasSpecialCharacterExpression = /[^\w]/;
    return !hasSpecialCharacterExpression.test(node.name);
  }
}
