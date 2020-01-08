import { DeclarationReflection, Reflection } from 'typedoc/dist/lib/models';
import ReflectionFormatter from './reflection-formatter';
import ReflectionRenderer from './reflection-renderer';

export default class FunctionRenderer extends ReflectionRenderer {
  public render(node: Reflection, terminationCharacter?: string): string {
    const method = node as DeclarationReflection;
    const lines: string[] = method.signatures!
      .map(s => ReflectionFormatter.instance().render(s, ';'));

    return lines.join('\n');
  }
}
