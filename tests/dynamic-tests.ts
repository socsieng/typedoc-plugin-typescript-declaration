import glob from 'glob';
import * as fs from 'fs';
import * as path from 'path';
import { Application } from 'typedoc/dist/lib/application';
import join from '../src/util/join';
import { CallbackLogger } from 'typedoc/dist/lib/utils';
import ReflectionFormatter from '../src/render/reflection-formatter';
import { ReflectionKind } from 'typedoc/dist/lib/models';
import mkdir from 'make-dir';
import VersionFilter from '../src/convert/version-filter';
import Version from '../src/util/version';

const writeOutput = process.env['DEBUG_MODE'] !== 'none';

const folders = glob.sync('test-data/**/*input.ts', { cwd: __dirname })
  .map(f => [f]);

describe('Dynamic test suite', () => {
  test.each(folders)('should execute test: %s', (testFile) => {
    const logOutput: string[] = [];
    const typedoc = new Application({
      tsconfig: 'tsconfig.json',
      includeDeclarations: true,
      excludeExternals: true,
    });
    typedoc.logger = new CallbackLogger((message: string) => { logOutput.push(message) });

    const project = typedoc.convert([path.join(__dirname, testFile)]);
    const basename = testFile.replace(/input\.ts$/i, '');
    const expectedFile = `${basename}expected.d.ts`;
    const expectedOutput = fs.readFileSync(path.join(__dirname, expectedFile), 'utf8');

    const formatter = ReflectionFormatter.instance();

    if (project) {
      const ouputBase = path.resolve(__dirname, '../output');
      const outputJsonFile = `${path.join(ouputBase, basename)}output.json`;
      const outputDeclarationFile = `${path.join(ouputBase, basename)}output.d.ts`;
      const outputDirectory = path.dirname(outputJsonFile);

      const reflectionsToRemove = VersionFilter.instance().filterReflections(Object.values(project.reflections), Version.parse('1.0'));
      VersionFilter.instance().removeReflections(project, reflectionsToRemove);

      if (writeOutput) {
        mkdir.sync(outputDirectory);

        fs.writeFileSync(outputJsonFile, JSON.stringify(project.toObject(), null, '  '));
      }

      const result = join('\n', project.children!
        .map(c => c.kind === ReflectionKind.ExternalModule ? c.children! : [c])
        .reduce((prev, item) => [...prev, ...item], [])
        .map(r => formatter.render(r)));

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
