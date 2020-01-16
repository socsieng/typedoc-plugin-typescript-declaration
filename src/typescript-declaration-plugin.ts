import * as fs from 'fs';
import * as path from 'path';
import { BindOption, SourceFileMode } from 'typedoc/dist/lib/utils';
import { DeclarationOption, ParameterHint, ParameterType, TypeDocOptions } from 'typedoc/dist/lib/utils/options/declaration';
import ReflectionFormatter, { ReflectionSortFlags, sortMapping } from './render/reflection-formatter';
import { ProjectReflection } from 'typedoc/dist/lib/models';
import { Renderer } from 'typedoc/dist/lib/output/renderer';
import { RendererComponent } from 'typedoc/dist/lib/output/components';
import { RendererEvent } from 'typedoc/dist/lib/output/events';
import mkdir from 'make-dir';

const declarationFileOption = {
  name: 'declarationFile',
  hint: ParameterHint.File,
  type: ParameterType.String,
  help: 'The output file location to write the declaration to',
} as DeclarationOption;

const declarationOnlyOption = {
  name: 'declarationOnly',
  type: ParameterType.Boolean,
  help: 'Render the type declaration file only, other renderers will be removed (must be used with --declarationFile option)',
} as DeclarationOption;

const sortOptionOption = {
  name: 'sortOption',
  type: ParameterType.Map,
  help: 'Sort types in declaration file by name instead of the typedoc default',
  defaultValue: ReflectionSortFlags.none,
  map: sortMapping,
} as DeclarationOption;

export class TypeScriptDeclarationPlugin extends RendererComponent {
  static options = [
    declarationFileOption,
    declarationOnlyOption,
    sortOptionOption,
  ];

  @BindOption(declarationFileOption.name)
  _declarationFile?: string;

  @BindOption(declarationOnlyOption.name)
  _declarationOnly?: boolean;

  @BindOption(sortOptionOption.name)
  _sortOption!: ReflectionSortFlags;

  protected initialize() {
    this.listenTo(this.owner, {
      [RendererEvent.BEGIN]: this.onRenderBegin,
    });
  }

  public applyConfiguration() {
    const app = this.application;
    app.options.read(app.logger);
    const options: Partial<TypeDocOptions> & Partial<{
      declarationOnly: boolean,
    }> = app.options.getRawValues();

    if (options.declarationOnly || !options.out) {
      app.options.setValue('out', './docs');
      app.options.setValue('disableOutputCheck', true);
      app.options.setValue('declarationOnly', true);

      if (options.mode === undefined) {
        app.options.setValue('mode', SourceFileMode.File);
      }

      Renderer.getDefaultTheme = () => path.join(__dirname, 'themes/noop');
      Renderer.getThemeDirectory = () => path.join(__dirname, 'themes');
      app.options.setValue('theme', Renderer.getDefaultTheme());

      app.renderer.getComponents()
        .filter(c => c.componentName !== 'typescript-declaration')
        .forEach(c => app.renderer.removeComponent(c.componentName));
    }
  }

  private veriftProject(project: ProjectReflection) {
    if (this._declarationOnly && !this._declarationFile) {
      throw new Error('--declarationFile file must be specified when using the --declarationOnly option');
    }

    if (!project.children) {
      const message = ['', 'ERROR: No types found, nothing to write'];

      const includesDeclaration = !!process.argv.find(arg => arg !== this._declarationFile && /\.d\.ts$/.test(arg));
      if (this._declarationOnly && includesDeclaration) {
        message.push('Consider using the --includeDeclarations option');
      }

      console.error(message.join('\n'));
      process.exit(1);
    }
  }

  private onRenderBegin(event: RendererEvent) {
    this.veriftProject(event.project);

    TypeScriptDeclarationPlugin.generateTypeDeclarations(event.project, this._sortOption, this._declarationFile)
  }

  public static generateTypeDeclarations(project: ProjectReflection, sortOption: ReflectionSortFlags, filename?: string) {
    const formatter = ReflectionFormatter.instance();
    let file = filename;

    ReflectionFormatter.sortOption = sortOption;

    if (file) {
      file = path.resolve(process.cwd(), file);

      const directory = path.dirname(file);

      if (!fs.existsSync(directory)) {
        mkdir.sync(directory);
      }

      const result = formatter.render(project);

      fs.writeFileSync(file, result);

      console.log(`TypeScript definition file written to ${file}.`);
    } else {
      console.log('No TypeScript definition file written. Use the --declarationFile option to create a definition file.');
    }
  }
}
