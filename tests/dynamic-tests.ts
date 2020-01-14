import * as fs from 'fs';
import * as path from 'path';
import ReflectionFormatter, { ReflectionSortFlags } from '../src/render/reflection-formatter';
import { Application } from 'typedoc/dist/lib/application';
import { CallbackLogger } from 'typedoc/dist/lib/utils';
import KeyOfCommentResolver from '../src/convert/keyof-comment-resolver';
import { SourceFileMode } from 'typedoc/dist/lib/converter/nodes/block';
import { TSConfigReader } from 'typedoc/dist/lib/utils/options/readers';
import { TypeDocAndTSOptions } from 'typedoc/dist/lib/utils/options/declaration';
import Version from '../src/util/version';
import VersionFilter from '../src/convert/version-filter';
import glob from 'glob';
import mkdir from 'make-dir';
import { OmitTagsPlugin } from '../src/omit-tags-plugin';

const writeOutput = process.env['DEBUG_MODE'] !== 'none';

const folders = ['test-data/**/*input.ts', 'test-data/**/*input.d.ts', 'test-data/**/*exact.d.ts']
  .map(f => glob.sync(f, { cwd: __dirname }))
  .reduce((allFiles, files) => [...allFiles, ...files], [])
  .map(f => [f]);

function createApplication(logOutput: string[]) {
  const options: Partial<TypeDocAndTSOptions> = {
    tsconfig: path.resolve(__dirname, '../tsconfig.json'),
    // ignoreCompilerErrors: true,
    includeDeclarations: true,
    excludeExternals: true,
    mode: SourceFileMode.File,
  };

  const app = new Application();
  app.logger = new CallbackLogger((message: string) => { logOutput.push(message) });

  app.options.addReader(new TSConfigReader())

  app.bootstrap(options);

  return app;
}

describe('Dynamic test suite', () => {
  test.each(folders)('should execute test: %s', (testFile) => {
    const logOutput: string[] = [];
    const app = createApplication(logOutput);

    const project = app.convert([path.join(__dirname, testFile)]);
    const basename = testFile.replace(/(input|exact)(\.d)?\.ts$/i, '');
    const expectedFile = /exact\.d\.ts$/i.test(testFile) ? testFile : `${basename}expected.d.ts`;
    const expectedOutput = fs.readFileSync(path.join(__dirname, expectedFile), 'utf8');

    ReflectionFormatter.sortOption = ReflectionSortFlags.tag;
    const formatter = ReflectionFormatter.instance();

    if (project) {
      const ouputBase = path.resolve(__dirname, '../output');
      const outputSuffix = /exact\.d\.ts$/i.test(testFile) ? 'exact' : 'output';
      const outputJsonFile = `${path.join(ouputBase, basename)}${outputSuffix}.json`;
      const outputDeclarationFile = `${path.join(ouputBase, basename)}${outputSuffix}.d.ts`;
      const outputDirectory = path.dirname(outputJsonFile);

      const filter = VersionFilter.instance();
      const keyOfResolver = KeyOfCommentResolver.instance();

      const reflectionsToRemove = filter.filterReflections(Object.values(project.reflections), Version.parse('1.0'));
      const reflectionsWithKeys = Object.values(project.reflections).filter(r => keyOfResolver.shouldResolveKeys(project, r));
      const reflectionsToInline = Object.values(project.reflections).filter(r => keyOfResolver.shouldInlineKeys(project, r));

      filter.removeReflections(project, reflectionsToRemove);
      reflectionsWithKeys.forEach(r => keyOfResolver.resolveKeys(project, r));
      reflectionsToInline.forEach(r => keyOfResolver.inlineKeys(project, r));

      OmitTagsPlugin.removeTags(Object.values(project.reflections), ['stuff']);

      if (writeOutput) {
        mkdir.sync(outputDirectory);

        fs.writeFileSync(outputJsonFile, JSON.stringify(app.serializer.toObject(project), null, '  '));
      }

      const result = formatter.render(project);

      if (writeOutput) {
        fs.writeFileSync(outputDeclarationFile, result);
      }
      expect(result).toBe(expectedOutput.trim());
    } else {
      console.log(logOutput.join('\n'));
      expect(logOutput).toEqual([]);
    }
  });
});
