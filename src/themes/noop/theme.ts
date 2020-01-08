import { Theme } from "typedoc/dist/lib/output/theme";
import { ProjectReflection } from "typedoc/dist/lib/models";
import { UrlMapping } from "typedoc/dist/lib/output/models/UrlMapping";
import { NavigationItem } from "typedoc/dist/lib/output/models/NavigationItem";
import { Renderer } from "typedoc/dist/lib/output/renderer";

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
