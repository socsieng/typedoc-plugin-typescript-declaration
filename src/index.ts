import { Application } from "typedoc/dist/lib/application";
import { TypeScriptDeclarationRenderer } from "./typescript-declaration-renderer";
import { RendererComponent } from "typedoc/dist/lib/output/components";
import { ParameterType, ParameterHint } from "typedoc/dist/lib/utils/options/declaration";
import { FilterConverter } from "./filter-converter";

module.exports = (PluginHost: Application) => {
  const app = PluginHost.owner;

  app.options.addDeclaration({
    name: 'declarationFile',
    hint: ParameterHint.File,
    type: ParameterType.String,
    help: 'The output file location to write the declaration to',
  });

  app.options.addDeclaration({
    name: 'maxVersion',
    type: ParameterType.String,
    help: 'The maxminum version number to include in the filter (compares against the `@since` tag)',
  });

  app.renderer.addComponent('typescript-declaration-renderer', TypeScriptDeclarationRenderer as unknown as RendererComponent);
  app.converter.addComponent('filter-converter', FilterConverter as unknown as FilterConverter);
}
