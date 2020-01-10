import { Context, Converter } from 'typedoc/dist/lib/converter';
import { Component } from 'typedoc/dist/lib/output/components';
import { ConverterComponent } from 'typedoc/dist/lib/converter/components';
import KeyOfCommentResolver from './convert/keyof-comment-resolver';

export enum AddKeysTagOption {
  off = 0,
  add = 1,
  update = 2,
}

export const addKeysOptionMapping: { [key: string]: AddKeysTagOption } = {
  off: AddKeysTagOption.off,
  add: AddKeysTagOption.add,
  update: AddKeysTagOption.update,
};

@Component({ name: 'keyof-comment' })
export class KeyOfCommentConverter extends ConverterComponent {
  protected initialize() {
    this.listenTo(this.owner, {
      [Converter.EVENT_RESOLVE_BEGIN]: this.onBeginResolve,
    });
  }

  private onBeginResolve(context: Context) {
    const resolver = KeyOfCommentResolver.instance();
    const override = this.application.options.getValue('keyofComments') === AddKeysTagOption.update;

    Object.values(context.project.reflections)
      .filter(item => resolver.shouldResolveKeys(context.project, item))
      .forEach(item => resolver.resolveKeys(context.project, item, override));
  }
}
