import { Application } from 'typedoc/dist/lib/application';
import { KeyOfCommentPlugin } from './keyof-comment-plugin';
import { TypeScriptDeclarationPlugin } from './typescript-declaration-plugin';
import { VersionFilterPlugin } from './version-filter-plugin';

module.exports = (PluginHost: Application) => {
  const app = PluginHost.owner;

  app.renderer.addComponent('typescript-declaration', new TypeScriptDeclarationPlugin(app.renderer))
    .applyConfiguration();
  app.converter.addComponent('version-filter', new VersionFilterPlugin(app.converter));
  app.converter.addComponent('keyof-comment', new KeyOfCommentPlugin(app.converter));
}
