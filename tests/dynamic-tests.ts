import * as fs from 'fs';
import * as path from 'path';
import { Application } from 'typedoc/dist/lib/application';
import { CallbackLogger } from 'typedoc/dist/lib/utils';
import ReflectionFormatter from '../src/render/reflection-formatter';
import Version from '../src/util/version';
import VersionFilter from '../src/convert/version-filter';
import glob from 'glob';
import join from '../src/util/join';
import mkdir from 'make-dir';

const writeOutput = process.env['DEBUG_MODE'] !== 'none';

const folders = ['test-data/**/*input.ts', 'test-data/**/*input.d.ts', 'test-data/**/*exact.d.ts']
  .map(f => glob.sync(f, { cwd: __dirname }))
  .reduce((allFiles, files) => [...allFiles, ...files], [])
  .map(f => [f]);

describe('Dynamic test suite', () => {
  test.each(folders)('should execute test: %s', (testFile) => {
    const logOutput: string[] = [];
    const typedoc = new Application({
      tsconfig: 'tsconfig.json',
      includeDeclarations: true,
      excludeExternals: true,
      mode: 'file',
    });
    typedoc.logger = new CallbackLogger((message: string) => { logOutput.push(message) });

    const project = typedoc.convert([path.join(__dirname, testFile)]);
    const basename = testFile.replace(/(input|exact)(\.d)?\.ts$/i, '');
    const expectedFile = /exact\.d\.ts$/i.test(testFile) ? testFile : `${basename}expected.d.ts`;
    const expectedOutput = fs.readFileSync(path.join(__dirname, expectedFile), 'utf8');

    const formatter = ReflectionFormatter.instance();

    if (project) {
      const ouputBase = path.resolve(__dirname, '../output');
      const outputSuffix = /exact\.d\.ts$/i.test(testFile) ? 'exact' : 'output';
      const outputJsonFile = `${path.join(ouputBase, basename)}${outputSuffix}.json`;
      const outputDeclarationFile = `${path.join(ouputBase, basename)}${outputSuffix}.d.ts`;
      const outputDirectory = path.dirname(outputJsonFile);

      const reflectionsToRemove = VersionFilter.instance().filterReflections(Object.values(project.reflections), Version.parse('1.0'));
      VersionFilter.instance().removeReflections(project, reflectionsToRemove);

      if (writeOutput) {
        mkdir.sync(outputDirectory);

        fs.writeFileSync(outputJsonFile, JSON.stringify(project.toObject(), null, '  '));
      }

      const result = join('\n', project.children!.map(r => formatter.render(r)));

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
