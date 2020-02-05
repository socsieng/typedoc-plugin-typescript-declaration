import { Context, Converter } from 'typedoc/dist/lib/converter';
import { ConverterComponent } from 'typedoc/dist/lib/converter/components';
import KeyOfCommentResolver from './convert/keyof-comment-resolver';

export class KeyOfPlugin extends ConverterComponent {
  static options = [
  ];

  protected initialize() {
    this.listenTo(this.owner, {
      [Converter.EVENT_RESOLVE_BEGIN]: this.onBeginResolve,
    });
  }

  private onBeginResolve(context: Context) {
    const resolver = KeyOfCommentResolver.instance();
    Object.values(context.project.reflections)
      .filter(item => resolver.shouldInlineKeys(context.project, item))
      .forEach(item => resolver.inlineKeys(context.project, item));
  }
}
