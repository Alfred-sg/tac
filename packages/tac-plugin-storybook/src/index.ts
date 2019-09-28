import * as path from 'path';
import * as dargs from 'dargs';
import { fork } from "@tac/utils";
import { Ctx } from "./types";

export default function (ctx: Ctx, opts: { build?: boolean } = {}) {
  const { cwd } = ctx;
  const { build } = opts;
  const binPath = path.resolve(__dirname, 
    `../node_modules/@storybook/react/bin/${!build ? 'index' : 'build'}.js`);
  const forkNodeArgv = [...new Set(dargs({
    configDir: path.resolve(__dirname, "../.storybook"),
  }, {}))];

  fork(binPath, ['', ...forkNodeArgv], {
    cwd,
  });
}