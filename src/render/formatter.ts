import { Reflection, ReflectionKind } from 'typedoc/dist/lib/models';
import ReflectionFormatter from './reflection-formatter';


export default class Formatter {
  public render(reflection?: Reflection): string {
    if (reflection?.kindOf([ReflectionKind.Class, ReflectionKind.Enum, ReflectionKind.Interface, ReflectionKind.TypeAlias])) {
      return ReflectionFormatter.instance().render(reflection);
    }
    return '';
  }

  private static _instance: Formatter;
  public static instance() {
    if (!Formatter._instance) {
      Formatter._instance = new Formatter();
    }
    return Formatter._instance;
  }
}
