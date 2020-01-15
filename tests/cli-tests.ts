import * as path from 'path';
import { DeclarationOption } from 'typedoc';
import { execFile } from 'child_process';

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

it('should render version information without error', (done) => {
  execFile(binFile, ['--version'], (err, stdout, stderr) => {
    if (err) {
      handleError(err.code, stdout, stderr);
    }
    expect(err).toBeNull();
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
