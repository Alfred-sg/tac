import * as path from 'path';
import * as dargs from 'dargs';
import { Context, fork } from "@tac/utils";

export default function (ctx: Context) {
  ctx.registerCommand({
    name: 'lib', 
    describe: "运行测试脚本",
    handler: (ctx: Context) => {
      const { cwd } = ctx;
      const binPath = path.resolve(__dirname, "../node_modules/docz/bin/index.js");
      const forkNodeArgv = [...new Set(dargs({
      }, {}))];
    
      fork(binPath, ['dev', ...forkNodeArgv], {
        cwd,
      });
    }
  });
}