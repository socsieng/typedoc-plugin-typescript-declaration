import * as path from 'path';
import { Component } from 'typedoc/dist/lib/output/components';
import { Converter } from 'typedoc/dist/lib/converter';
import { ConverterComponent } from 'typedoc/dist/lib/converter/components';
import { Renderer } from 'typedoc/dist/lib/output/renderer';
import { SourceFileMode } from 'typedoc/dist/lib/converter/nodes/block';

@Component({ name: 'noop-theme' })
export class NoopThemeComponent extends ConverterComponent {
  protected initialize() {
    this.listenTo(this.owner, {
      [Converter.EVENT_BEGIN]: this.onBegin,
    });

    this.application.renderer.removeAllComponents();
  }

  private onBegin() {
    Renderer.getDefaultTheme = () => path.join(__dirname, 'themes/noop');
    Renderer.getThemeDirectory = () => path.join(__dirname, 'themes');

    const options = this.application.options;

    options.setValue('theme', Renderer.getDefaultTheme());

    if (!options.getValue('out')) {
      options.setValue('out', '.');
      options.setValue('disableOutputCheck', true);

      const rawOptions = options.getRawValues();
      if (rawOptions.mode === undefined) {
        options.setValue('mode', SourceFileMode.File);
      }
    }
  }
}
