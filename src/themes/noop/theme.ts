import { NavigationItem } from 'typedoc/dist/lib/output/models/NavigationItem';
import { ProjectReflection } from 'typedoc/dist/lib/models';
import { Renderer } from 'typedoc/dist/lib/output/renderer';
import { Theme } from 'typedoc/dist/lib/output/theme';
import { UrlMapping } from 'typedoc/dist/lib/output/models/UrlMapping';

export default class NoopTheme extends Theme {
  constructor(renderer: Renderer, basePath: string) {
    super(renderer, basePath);
  }

  isOutputDirectory(path: string): boolean {
    return true;
  }

  getUrls(project: ProjectReflection): UrlMapping[] {
    return [];
  }

  getNavigation(project: ProjectReflection): NavigationItem {
    return new NavigationItem();
  }
}
