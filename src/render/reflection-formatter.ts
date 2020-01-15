import { Reflection } from 'typedoc/dist/lib/models';
import { renderers } from './renderers';

/**
 * Sort flags
 */
export enum ReflectionSortFlags {
  none = 0,
  /**
   * @internal
   */
  tag = 1,
  container = 2,
  leaf = 4,
  all = 7,
}

export const sortMapping: { [key: string]: ReflectionSortFlags | undefined } = {
  none: ReflectionSortFlags.none,
  tag: ReflectionSortFlags.tag,
  container: ReflectionSortFlags.container,
  leaf: ReflectionSortFlags.leaf,
  all: ReflectionSortFlags.all,
};

export default class ReflectionFormatter {
  public static sortOption: ReflectionSortFlags = ReflectionSortFlags.none;

  public render(reflection?: Reflection, terminatorCharater?: string): string {
    if (reflection) {
      const renderer = renderers[reflection.kind];

      if (renderer) {
        return renderer.render(reflection, terminatorCharater);
      }

      throw new Error(`Unrecognised reflection for kind ${reflection.kindString} ${reflection.name}`);
    }

    return '';
  }

  private static _instance: ReflectionFormatter;
  public static instance() {
    if (!ReflectionFormatter._instance) {
      ReflectionFormatter._instance = new ReflectionFormatter();
    }
    return ReflectionFormatter._instance;
  }
}
