import { ProjectReflection, Reflection } from 'typedoc/dist/lib/models';
import { CommentPlugin } from 'typedoc/dist/lib/converter/plugins/CommentPlugin';
import Version from '../util/version';

export default class VersionFilter {
  public isIncluded(reflection: Reflection, maxVersion: Version) {
    const tags = reflection.comment?.tags;
    if (tags) {
      const since = tags.find(t => t.tagName === 'since');
      if (since && since.text) {
        try {
          const version = Version.parse(since.text.trim());

          const remove = maxVersion.compare(version) < 0;

          return !remove;
        } catch(err) {
          console.log(err);
        }
      }
    }

    return true;
  }

  public filterReflections(reflections: Reflection[], maxVersion: Version) {
    return reflections.filter(r => !this.isIncluded(r, maxVersion));
  }

  public removeReflections(project: ProjectReflection, reflectionsToRemove: Reflection[]) {
    CommentPlugin.removeReflections(project, reflectionsToRemove);
  }

  private static _instance: VersionFilter;
  public static instance() {
    if (!VersionFilter._instance) {
      VersionFilter._instance = new VersionFilter();
    }
    return VersionFilter._instance;
  }
}
