import { Application } from 'typedoc/dist/lib/application';
import { KeyOfPlugin } from './keyof-plugin';
import { OmitTagsPlugin } from './omit-tags-plugin';
import { TypeScriptDeclarationPlugin } from './typescript-declaration-plugin';
import { VersionFilterPlugin } from './version-filter-plugin';
import { addDecoratedOptions } from 'typedoc/dist/lib/utils/options/sources';

module.exports = (PluginHost: Application) => {
  const app = PluginHost.owner;

  app.converter.addComponent('version-filter', new VersionFilterPlugin(app.converter));
  app.converter.addComponent('keyof-comment', new KeyOfPlugin(app.converter));
  app.converter.addComponent('omit-tags', new OmitTagsPlugin(app.converter));

  const declarationPlugin = app.renderer.addComponent('typescript-declaration', new TypeScriptDeclarationPlugin(app.renderer));

  // work-around for typedoc options not being read: https://github.com/TypeStrong/typedoc/issues/1165
  addDecoratedOptions(app.options);

  declarationPlugin.applyConfiguration();
}
