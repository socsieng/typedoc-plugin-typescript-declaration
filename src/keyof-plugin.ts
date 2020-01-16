import { Context, Converter } from 'typedoc/dist/lib/converter';
import { DeclarationOption, ParameterType } from 'typedoc/dist/lib/utils/options/declaration';
import { BindOption } from 'typedoc/dist/lib/utils';
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

const keyofCommentsOption = {
  name: 'keyofComments',
  type: ParameterType.Map,
  help: 'Expands the values of the keyof operator and adds a tag, default is set to off',
  defaultValue: AddKeysTagOption.off,
  map: addKeysOptionMapping,
} as DeclarationOption;

export class KeyOfPlugin extends ConverterComponent {
  static options = [
    keyofCommentsOption,
  ];

  @BindOption(keyofCommentsOption.name)
  _mode!: AddKeysTagOption;

  protected initialize() {
    this.listenTo(this.owner, {
      [Converter.EVENT_RESOLVE_BEGIN]: this.onBeginResolve,
    });
  }

  private onBeginResolve(context: Context) {
    const resolver = KeyOfCommentResolver.instance();
    if (this._mode !== AddKeysTagOption.off) {
      const override = this._mode === AddKeysTagOption.update;

      Object.values(context.project.reflections)
        .filter(item => resolver.shouldResolveKeys(context.project, item))
        .forEach(item => resolver.resolveKeys(context.project, item, override));
    }

    Object.values(context.project.reflections)
      .filter(item => resolver.shouldInlineKeys(context.project, item))
      .forEach(item => resolver.inlineKeys(context.project, item));
  }
}
