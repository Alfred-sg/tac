import * as babelJest from 'babel-jest';
import { dirname } from 'path';

module.exports = babelJest.createTransformer({
  presets: [
    [
      require.resolve('@tac/babel-preset-tac'),
      {
        transformRuntime: false,
      },
    ],
  ],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        alias: {
          'ts-jest': require.resolve('ts-jest'),
          react: dirname(require.resolve('react/package')),
          'react-dom': dirname(require.resolve('react-dom/package')),
          enzyme: require.resolve('enzyme'),
        },
      },
    ],
  ],
});
