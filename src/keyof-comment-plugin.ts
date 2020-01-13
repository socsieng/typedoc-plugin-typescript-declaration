import { Context, Converter } from 'typedoc/dist/lib/converter';
import { Component } from 'typedoc/dist/lib/output/components';
import { ConverterComponent } from 'typedoc/dist/lib/converter/components';
import KeyOfCommentResolver from './convert/keyof-comment-resolver';
import { Option } from 'typedoc/dist/lib/utils';
import { ParameterType } from 'typedoc/dist/lib/utils/options/declaration';

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
export class KeyOfCommentPlugin extends ConverterComponent {
  @Option({
    name: 'keyofComments',
    type: ParameterType.Map,
    help: 'Expands the values of the keyof operator and adds a tag, default is update which adds and updates keys',
    defaultValue: AddKeysTagOption.update,
    map: addKeysOptionMapping,
  })
  private _mode!: AddKeysTagOption;

  protected initialize() {
    this.listenTo(this.owner, {
      [Converter.EVENT_RESOLVE_BEGIN]: this.onBeginResolve,
    });
  }

  private onBeginResolve(context: Context) {
    if (this._mode !== AddKeysTagOption.off) {
      const resolver = KeyOfCommentResolver.instance();
      const override = this._mode === AddKeysTagOption.update;

      Object.values(context.project.reflections)
        .filter(item => resolver.shouldResolveKeys(context.project, item))
        .forEach(item => resolver.resolveKeys(context.project, item, override));
    }
  }
}
