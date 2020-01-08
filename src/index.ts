import { Application } from "typedoc/dist/lib/application";
import { TypeScriptDeclarationRenderer } from "./typescript-declaration-renderer";
import { ParameterType, ParameterHint } from "typedoc/dist/lib/utils/options/declaration";
import { FilterConverter } from "./filter-converter";
import { NoopThemeComponent } from "./noop-theme-component";

module.exports = (PluginHost: Application) => {
  const app = PluginHost.owner;

  app.options.addDeclaration({
    name: 'declarationFile',
    hint: ParameterHint.File,
    type: ParameterType.String,
    help: 'The output file location to write the declaration to',
  });

  app.options.addDeclaration({
    name: 'declarationOnly',
    type: ParameterType.Boolean,
    help: 'Render the type declaration file only, other renderers will be removed (must be used with --declarationFile option)',
  });

  app.options.addDeclaration({
    name: 'maxVersion',
    type: ParameterType.String,
    help: 'The maxminum version number to include in the filter (compares against the `@since` tag)',
  });

  app.options.read();

  const options = app.options.getRawValues();

  if (options.declarationOnly && !options.declarationFile) {
    throw new Error('--declarationFile file must be specified when using the --declarationOnly option');
  }

  if (options.declarationOnly) {
    app.converter.addComponent('noop-theme', new NoopThemeComponent(app.converter));
  }

  app.renderer.addComponent('typescript-declaration-renderer', new TypeScriptDeclarationRenderer(app.renderer));
  app.converter.addComponent('filter-converter', new FilterConverter(app.converter));
}
