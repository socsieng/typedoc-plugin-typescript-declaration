import { DeclarationReflection, Reflection } from 'typedoc/dist/lib/models';
import CallSignatureRenderer from './call-signature-renderer';
import ReflectionFormatter from './reflection-formatter';

export default class EventRenderer extends CallSignatureRenderer {
  public render(node: Reflection, terminationCharacter?: string): string {
    const method = node as DeclarationReflection;

    if (method.signatures) {
      const lines: string[] = method.signatures
        .map(s => ReflectionFormatter.instance().render(s, terminationCharacter));

      return lines.join('\n');
    }

    return super.render(method, terminationCharacter);
  }
}
