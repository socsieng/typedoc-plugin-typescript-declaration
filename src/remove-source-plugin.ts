import { Context, Converter } from 'typedoc/dist/lib/converter';
import { DeclarationOption, ParameterType } from 'typedoc/dist/lib/utils/options/declaration';
import { BindOption } from 'typedoc/dist/lib/utils';
import { ConverterComponent } from 'typedoc/dist/lib/converter/components';

const removeSourceOption = {
  name: 'removeSource',
  type: ParameterType.Boolean,
  help: 'Remove source elements from rendered output',
  defaultValue: false,
} as DeclarationOption;

export class RemoveSourcePlugin extends ConverterComponent {
  static options = [
    removeSourceOption,
  ];

  @BindOption(removeSourceOption.name)
  _removeSource?: boolean;

  protected initialize() {
    this.listenTo(this.owner, {
      [Converter.EVENT_RESOLVE_END]: this.onEndResolve,
    });
  }

  private onEndResolve(context: Context) {
    if (this._removeSource) {
      Object.values(context.project.reflections).forEach(reflection => {
        console.log('removing', reflection.sources?.length);
        reflection.sources = undefined;
        console.log('removed');
      });
    }
  }
}
