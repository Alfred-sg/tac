import * as jest from 'jest';
import { join } from 'path';
import { existsSync } from 'fs';
import { Ctx } from "./types";

export default function(ctx: Ctx, opts = {}) {
  const { cwd = process.cwd() } = ctx;

  const jestConfigFile = join(cwd, 'jest.config.js');
  let userJestConfig = {};
  if (existsSync(jestConfigFile)) {
    userJestConfig = require(jestConfigFile); // eslint-disable-line
  }

  const {
    ...extra
  } = userJestConfig;

  // https://jestjs.io/docs/en/configuration
  const config = {
    rootDir: cwd,
    // A list of paths to modules that run some code to configure or set up the 
    // testing environment. Each setupFile will be run once per test file. Since 
    // every test runs in its own environment, these scripts will be executed in 
    // the testing environment immediately before executing the test code itself.
    setupFiles: [
      require.resolve('./shim.js'),
      require.resolve('./setupTests.js'),
    ],
    resolver: require.resolve('jest-pnp-resolver'),
    // A map from regular expressions to paths to transformers. A transformer is 
    // a module that provides a synchronous function for transforming source files. 
    // For example, if you wanted to be able to use a new language feature in your 
    // modules or tests that isn't yet supported by node, you might plug in one of 
    // many compilers that compile a future version of JavaScript to a current one.
    transform: {
      '\\.jsx?$': require.resolve('./transformers/jsTransformer'),
      '\\.tsx?$': require.resolve('./transformers/tsTransformer'),
      '\\.svg$': require.resolve('./transformers/fileTransformer'),
    },
    // The glob patterns Jest uses to detect test files.
    testMatch: ['**/?(*.)(spec|test|e2e).(j|t)s?(x)'],
    // An array of file extensions your modules use. If you require modules without 
    // specifying a file extension, these are the extensions Jest will look for, in 
    // left-to-right order.
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
    // A list of paths to modules that run some code to configure or set up the testing 
    // framework before each test. Since setupFiles executes before the test framework 
    // is installed in the environment, this script file presents you the opportunity of 
    // running some code immediately after the test framework has been installed in the 
    // environment.
    setupFilesAfterEnv: [require.resolve('./jasmine')],
    ...extra,
  };

  return new Promise((resolve, reject) => {
    jest
      .runCLI(
        {
          _: [],
          $0: "jest",
          ...opts,
          config: JSON.stringify(config),
        },
        [cwd],
      )
      .then(result => {
        const { results } = result;
        if (results.success) {
          resolve();
        } else {
          reject(new Error('Jest failed'));
        }
      })
      .catch(e => {
        console.log(e);
      });
  });
}
