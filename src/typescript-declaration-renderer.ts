import { Component, RendererComponent } from 'typedoc/dist/lib/output/components';
import { RendererEvent } from 'typedoc/dist/lib/output/events';
import join from './util/join';
import ReflectionFormatter from './render/reflection-formatter';
import * as fs from 'fs';
import * as path from 'path';
import mkdir from 'make-dir';

@Component({ name: 'typescript-declaration-renderer' })
export class TypeScriptDeclarationRenderer extends RendererComponent {
  protected initialize() {
    this.listenTo(this.owner, {
      [RendererEvent.BEGIN]: this.onRenderBegin,
    });
  }

  private onRenderBegin(event: RendererEvent) {
    const formatter = ReflectionFormatter.instance();
    const options = this.application.options;

    let file = options.getValue('declarationFile') as string;

    if (file) {
      file = path.resolve(process.cwd(), file);

      const directory = path.dirname(file);

      if (!fs.existsSync(directory)) {
        mkdir.sync(directory);
      }

      const result = join('\n\n', event.project.children!
        .map(r => formatter.render(r)));

      fs.writeFileSync(file, result);

      console.log(`TypeScript definition file written to ${file}.`);
    } else {
      console.log('No TypeScript definition file written. Use the --declarationFile option to create a definition file');
    }
  }
}
