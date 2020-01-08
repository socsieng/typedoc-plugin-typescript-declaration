import { Component } from 'typedoc/dist/lib/output/components';
import { ConverterComponent } from 'typedoc/dist/lib/converter/components';
import { Converter, Context } from 'typedoc/dist/lib/converter';
import { Reflection, CommentTag, DeclarationReflection } from 'typedoc/dist/lib/models';
import Version from './util/version';
import { CommentPlugin } from 'typedoc/dist/lib/converter/plugins/CommentPlugin';

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
      CommentPlugin.removeReflections(project, this._excluded);
    }
  }

  private onDeclaration(context: Context, reflection: Reflection) {
    if (!this._maxVersion) return;

    const tags = reflection.comment?.tags;
    if (tags) {
      const since = tags.find(t => t.tagName === 'since');
      if (since && since.text) {
        try {
          const version = Version.parse(since.text.trim());

          const remove = this._maxVersion.compare(version) < 0;

          if (remove) {
            this._excluded!.push(reflection);
          }
        } catch(err) {
          console.log(err);
        }
      }
    }
  }
}
