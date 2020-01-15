import { Application, ArgumentsReader, TSConfigReader, TypeDocAndTSOptions, TypeDocReader } from 'typedoc';
import { ExitCode } from 'typedoc/dist/lib/cli';
import { ReflectionSortFlags } from './render/reflection-formatter';
import { TypeScriptDeclarationPlugin } from './typescript-declaration-plugin';
import { getOptionsHelp } from 'typedoc/dist/lib/utils/options/help';

const packageInfo = require('../package.json');

interface AdditionalOptions {
  declarationFile: string;
  declarationOnly: boolean;
  sorOption: ReflectionSortFlags;
}

export class CliApplication extends Application {
  private _inputFiles!: string[];

  constructor(options?: Partial<TypeDocAndTSOptions>) {
    super();
    this.bootstrap(options);
  }

  bootstrap(options?: Partial<TypeDocAndTSOptions>) {
    this.options.addReader(new ArgumentsReader(0));
    this.options.addReader(new TypeDocReader());
    this.options.addReader(new TSConfigReader());
    this.options.addReader(new ArgumentsReader(300));

    const result = super.bootstrap(options);
    if (result.hasErrors) {
      return process.exit(1);
    }

    this._inputFiles = result.inputFiles;

    return result;
  }

  start() {
    this.options.read(this.logger);
    const options = this.options.getRawValues();

    let { help, json, out, version } = options;
    let { declarationFile, declarationOnly, sorOption } = options as AdditionalOptions;

    if (declarationOnly && !declarationFile) {
      console.log('--declarationOnly must be used with the --declarationFile option');
      process.exit(ExitCode.OptionError);
    }

    if (version) {
      console.log(`${packageInfo.name} ${packageInfo.version}`);
      console.log(this.toString());
    } else if (help) {
      console.log(getOptionsHelp(this.options));
    } else if (this._inputFiles.length === 0) {
      console.log(getOptionsHelp(this.options));
      process.exit(ExitCode.NoInputFiles);
    } else {
      const src = this.expandInputFiles(this._inputFiles);
      const project = this.convert(src);
      let hasOutput = false;

      if (project) {
        if (declarationFile) {
          TypeScriptDeclarationPlugin.generateTypeDeclarations(project, sorOption, declarationFile);
          hasOutput = true;
        }
        if (out && !declarationOnly) {
          this.generateDocs(project, out);
          hasOutput = true;
        }
        if (json) {
          this.generateJson(project, json);
          hasOutput = true;
        }

        if (!hasOutput) {
          console.log('Nothing generated, use --declarationOnly, --out, or --json options');
        }

        if (this.logger.hasErrors()) {
          process.exit(ExitCode.OutputError);
        }
      } else {
        process.exit(ExitCode.CompileError);
      }
    }
  }
}
