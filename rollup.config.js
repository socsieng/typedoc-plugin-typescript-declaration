import typescript from 'rollup-plugin-typescript2';

const externalDependencies = [
  'fs',
  'make-dir',
  'path',
  'typedoc',
  'typedoc/dist/lib/converter',
  'typedoc/dist/lib/converter/components',
  'typedoc/dist/lib/converter/nodes/block',
  'typedoc/dist/lib/converter/plugins/CommentPlugin',
  'typedoc/dist/lib/models',
  'typedoc/dist/lib/output/renderer',
  'typedoc/dist/lib/output/components',
  'typedoc/dist/lib/output/events',
  'typedoc/dist/lib/output/models/NavigationItem',
  'typedoc/dist/lib/output/theme',
  'typedoc/dist/lib/utils',
  'typedoc/dist/lib/utils/component',
  'typedoc/dist/lib/utils/options/declaration',
  'typedoc/dist/lib/utils/options/help',
  'typedoc/dist/lib/utils/options/sources',
];

function onwarn(warning, rollupWarn) {
  if (warning.code !== 'CIRCULAR_DEPENDENCY') {
    rollupWarn(warning);
  }
}

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs'
    },
    external: externalDependencies,
    plugins: [
      typescript()
    ],
    onwarn,
  },
  {
    input: 'src/themes/noop/theme.ts',
    output: {
      file: 'dist/themes/noop/theme.js',
      format: 'cjs'
    },
    external: externalDependencies,
    plugins: [
      typescript()
    ],
    onwarn,
  },
];
