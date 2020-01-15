import { Application } from 'typedoc/dist/lib/application';
import { KeyOfPlugin } from './keyof-plugin';
import { OmitTagsPlugin } from './omit-tags-plugin';
import { TypeScriptDeclarationPlugin } from './typescript-declaration-plugin';
import { VersionFilterPlugin } from './version-filter-plugin';

const options = [
  ...VersionFilterPlugin.options,
  ...KeyOfPlugin.options,
  ...OmitTagsPlugin.options,
  ...TypeScriptDeclarationPlugin.options,
];

module.exports = (PluginHost: Application) => {
  const app = PluginHost.owner;

  app.options.addDeclarations(options);

  app.converter.addComponent('version-filter', new VersionFilterPlugin(app.converter));
  app.converter.addComponent('keyof-comment', new KeyOfPlugin(app.converter));
  app.converter.addComponent('omit-tags', new OmitTagsPlugin(app.converter));

  const declarationPlugin = app.renderer.addComponent('typescript-declaration', new TypeScriptDeclarationPlugin(app.renderer));

  declarationPlugin.applyConfiguration();
}

module.exports.options = options;
