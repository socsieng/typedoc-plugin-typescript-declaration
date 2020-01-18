import { BindOption, Reflection } from 'typedoc';
import { Context, Converter } from 'typedoc/dist/lib/converter';
import { DeclarationOption, ParameterType } from 'typedoc/dist/lib/utils/options/declaration';
import { ConverterComponent } from 'typedoc/dist/lib/converter/components';
import UnresolvedTypesMapper from './convert/unresolved-types-mapper';

const remapUnmappedTypesOption = {
  name: 'remapUnresolvedTypes',
  type: ParameterType.Boolean,
  help: 'Remaps unresolved types that were originally part of the project and replace them with unknown',
} as DeclarationOption;

export class UnresolvedTypesPlugin extends ConverterComponent {
  static options = [
    remapUnmappedTypesOption,
  ];

  private _mapper?: UnresolvedTypesMapper;

  @BindOption(remapUnmappedTypesOption.name)
  _remapTypes?: string[];

  protected initialize() {
    this.listenTo(this.owner, {
      [Converter.EVENT_BEGIN]: this.onBegin,
      [Converter.EVENT_CREATE_DECLARATION]: this.onDeclaration,
      [Converter.EVENT_RESOLVE_BEGIN]: this.onBeginResolve,
      [Converter.EVENT_RESOLVE_END]: this.onEndResolve,
    });
  }

  private onBegin(context: Context) {
    if (this._remapTypes) {
      this._mapper = new UnresolvedTypesMapper(context.project);
    }
  }

  private onDeclaration(context: Context, reflection: Reflection) {
    if (this._remapTypes) {
      this._mapper?.registerKnownReflection(reflection);
    }
  }

  private onBeginResolve(context: Context) {
    if (this._remapTypes) {
      this._mapper?.registerKnownReflections(Object.values(context.project.reflections));
    }
  }

  private onEndResolve(context: Context) {
    if (this._remapTypes) {
      this._mapper?.resolve();
    }
  }
}
