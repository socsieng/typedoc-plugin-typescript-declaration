import { Context, Converter } from 'typedoc/dist/lib/converter';
import { DeclarationOption, ParameterType } from 'typedoc/dist/lib/utils/options/declaration';
import { ConverterComponent } from 'typedoc/dist/lib/converter/components';
import { Reflection } from 'typedoc/dist/lib/models';
import { bind } from './util/options';

const omitTagOption = {
  name: 'omitTag',
  type: ParameterType.Array,
  help: 'A list of tags to remove from the generated output',
} as DeclarationOption;

export class OmitTagsPlugin extends ConverterComponent {
  static options = [
    omitTagOption,
  ];

  @bind(omitTagOption)
  _omitTags: string[] | undefined;

  protected initialize() {
    this.listenTo(this.owner, {
      [Converter.EVENT_RESOLVE_BEGIN]: this.onBeginResolve,
    });
  }

  private onBeginResolve(context: Context) {
    if (this._omitTags) {
      const project = context.project;
      OmitTagsPlugin.removeTags(Object.values(project.reflections), this._omitTags);
    }
  }

  static removeTags(reflections: Reflection[], tags: string[]) {
    reflections.forEach(r => {
      if (r.comment?.tags) {
        const tagsToKeep = r.comment.tags
          .filter(t => !tags.find(o => o === t.tagName));
        r.comment.tags = tagsToKeep;
      }
    });
  }
}
