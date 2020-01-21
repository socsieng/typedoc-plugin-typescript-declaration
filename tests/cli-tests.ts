import * as fs from 'fs';
import * as path from 'path';
import { DeclarationOption } from 'typedoc';
import { execFile } from 'child_process';
import rimraf from 'rimraf';

const binFile = path.resolve(__dirname, '../bin/typedoc-declare');

function handleError(errorCode: number | undefined, stdout: string, stderr: string) {
  console.log(`exit code: ${errorCode}`);
  if (stdout) {
    console.log(`stdout: ${stdout}`);
  }
  if (stdout) {
    console.log(`stderr: ${stderr}`);
  }
}

function toOptionsArray(options: { [key: string]: string }) {
  return Object.entries(options)
    .map(([key, value]) => [`--${key}`, value])
    .flat();
}

it('should render version information without error', (done) => {
  execFile(binFile, ['--version'], (err, stdout, stderr) => {
    if (err) {
      handleError(err.code, stdout, stderr);
    }
    expect(err).toBeNull();
    expect(stdout).toMatch(/typedoc-plugin-typescript-declaration [\d.]+/);
    done();
  });
});

it('should render options with help text', (done) => {
  execFile(binFile, ['--help'], (err, stdout, stderr) => {
    if (err) {
      handleError(err.code, stdout, stderr);
    }
    expect(err).toBeNull();

    const plugin = require('../src/index');
    const options = plugin.options as DeclarationOption[];
    options.forEach(option => {
      expect(stdout).toContain(`--${option.name}`);
    });

    done();
  });
});

it('should fail with an unknown option', (done) => {
  execFile(binFile, ['--unkownoptionthatshouldntbedefined'], (err) => {
    expect(err).toBeTruthy();
    done();
  });
});

describe('Document generation', () => {
  const exampleDir = path.resolve(__dirname, '../example');
  const docsDir = path.resolve(exampleDir, 'docs/test');
  const decsFile = path.resolve(exampleDir, 'docs/test.d.ts');

  beforeEach(() => {
    rimraf.sync(docsDir);
    rimraf.sync(decsFile);
  });

  it('should build example documents with docs option', (done) => {
    const options = toOptionsArray({
      out: 'docs/test',
    });
    execFile(binFile, options, { cwd: exampleDir }, (err, stdout, stderr) => {
      if (err) {
        handleError(err.code, stdout, stderr);
      }
      expect(err).toBeNull();

      expect(fs.existsSync(docsDir)).toEqual(true);
      expect(fs.existsSync(decsFile)).toEqual(false);

      done();
    });
  });

  it('should build example documents with declarationFile option', (done) => {
    const options = toOptionsArray({
      declarationFile: 'docs/test.d.ts',
    });
    execFile(binFile, options, { cwd: exampleDir }, (err, stdout, stderr) => {
      if (err) {
        handleError(err.code, stdout, stderr);
      }
      expect(err).toBeNull();

      expect(fs.existsSync(docsDir)).toEqual(false);
      expect(fs.existsSync(decsFile)).toEqual(true);

      done();
    });
  });

  it('should write declaration content to stdout', (done) => {
    const options = ['index.ts'];
    execFile(binFile, options, { cwd: exampleDir }, (err, stdout, stderr) => {
      if (err) {
        handleError(err.code, stdout, stderr);
      }
      expect(err).toBeNull();

      expect(stdout).toMatch(/^declare/);
      expect(stdout).toMatch(/\}\s*$/);

      expect(fs.existsSync(docsDir)).toEqual(false);
      expect(fs.existsSync(decsFile)).toEqual(false);

      done();
    });
  });

  it('should build example documents with docs and declarationFile option', (done) => {
    const options = toOptionsArray({
      out: 'docs/test',
      declarationFile: 'docs/test.d.ts',
      json: 'docs/test.json',
    }).concat('--removeSource', 'index.ts');
    execFile(binFile, options, { cwd: exampleDir }, (err, stdout, stderr) => {
      if (err) {
        handleError(err.code, stdout, stderr);
      }
      expect(err).toBeNull();

      expect(fs.existsSync(docsDir)).toEqual(true);
      expect(fs.existsSync(decsFile)).toEqual(true);

      done();
    });
  });
});
