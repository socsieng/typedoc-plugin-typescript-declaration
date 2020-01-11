import { Context, Converter } from 'typedoc/dist/lib/converter';
import { Component } from 'typedoc/dist/lib/output/components';
import { ConverterComponent } from 'typedoc/dist/lib/converter/components';
import { Option } from 'typedoc/dist/lib/utils';
import { ParameterType } from 'typedoc/dist/lib/utils/options/declaration';
import { Reflection } from 'typedoc/dist/lib/models';
import Version from './util/version';
import VersionFilter from './convert/version-filter';

@Component({ name: 'version-filter' })
export class VersionFilterPlugin extends ConverterComponent {
  @Option({
    name: 'maxVersion',
    type: ParameterType.String,
    help: 'The maxminum version number to include in the filter (compares against the `@since` tag)',
  })
  private _maxVersion?: string;

  private _version?: Version;
  private _excluded?: Reflection[];

  protected initialize() {
    this.listenTo(this.owner, {
      [Converter.EVENT_BEGIN]: this.onBegin,
      [Converter.EVENT_RESOLVE_BEGIN]: this.onBeginResolve,
      [Converter.EVENT_CREATE_DECLARATION]: this.onDeclaration,
      [Converter.EVENT_CREATE_PARAMETER]: this.onDeclaration,
      [Converter.EVENT_CREATE_SIGNATURE]: this.onDeclaration,
      [Converter.EVENT_CREATE_TYPE_PARAMETER]: this.onDeclaration,
    });
  }

  private onBegin() {
    this._excluded = [];
    if (this._maxVersion) {
      this._version = Version.parse(this._maxVersion);
    }
  }

  private onBeginResolve(context: Context) {
    if (this._excluded) {
      const project = context.project;
      VersionFilter.instance().removeReflections(project, this._excluded);
    }
  }

  private onDeclaration(context: Context, reflection: Reflection) {
    if (!this._version) return;

    if (!VersionFilter.instance().isIncluded(reflection, this._version)) {
      this._excluded!.push(reflection);
    }
  }
}
