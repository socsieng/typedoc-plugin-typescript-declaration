import * as fs from 'fs';
import * as path from 'path';
import { Component, RendererComponent } from 'typedoc/dist/lib/output/components';
import ReflectionFormatter from './render/reflection-formatter';
import { RendererEvent } from 'typedoc/dist/lib/output/events';
import join from './util/join';
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

    if (!event.project.children) {
      const message = ['', 'ERROR: No types found, nothing to write'];

      const includesDeclaration = !!process.argv.find(arg => arg !== file && /\.d\.ts$/.test(arg));
      if (!options.getValue('includeDeclarations') && includesDeclaration) {
        message.push('Consider using the --includeDeclarations option');
      }

      console.error(message.join('\n'));
      process.exit(1);
    }

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
