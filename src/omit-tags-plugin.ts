import { Context, Converter } from 'typedoc/dist/lib/converter';
import { Component } from 'typedoc/dist/lib/output/components';
import { ConverterComponent } from 'typedoc/dist/lib/converter/components';
import { Option } from 'typedoc/dist/lib/utils';
import { ParameterType } from 'typedoc/dist/lib/utils/options/declaration';
import { Reflection } from 'typedoc/dist/lib/models';

@Component({ name: 'omit-tags' })
export class OmitTagsPlugin extends ConverterComponent {
  @Option({
    name: 'omitTag',
    type: ParameterType.Array,
    help: 'A list of tags to remove from the generated output',
  })
  private _omitTags?: string[];

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
