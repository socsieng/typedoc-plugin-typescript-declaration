import { Context, Converter } from 'typedoc/dist/lib/converter';
import { Component } from 'typedoc/dist/lib/output/components';
import { ConverterComponent } from 'typedoc/dist/lib/converter/components';
import { Reflection } from 'typedoc/dist/lib/models';
import Version from './util/version';
import VersionFilter from './convert/version-filter';

@Component({ name: 'filter-converter' })
export class FilterConverter extends ConverterComponent {
  private _maxVersion?: Version;
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
    const versionNumber: string = this.application.options.getValue('maxVersion');

    this._excluded = [];
    if (versionNumber) {
      this._maxVersion = Version.parse(versionNumber);
    }
  }

  private onBeginResolve(context: Context) {
    if (this._excluded) {
      const project = context.project;
      VersionFilter.instance().removeReflections(project, this._excluded);
    }
  }

  private onDeclaration(context: Context, reflection: Reflection) {
    if (!this._maxVersion) return;

    if (!VersionFilter.instance().isIncluded(reflection, this._maxVersion)) {
      this._excluded!.push(reflection);
    }
  }
}
