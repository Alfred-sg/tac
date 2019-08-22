import * as webpack from "webpack";
import chalk from "chalk";
import * as rimraf from "rimraf";
import { Ctx, Opts } from "./types";
import config from "./config";

export default function (ctx: Ctx, opts: Opts) {
  const options = config(ctx, opts);
  const compiler = webpack(options);

  console.log(chalk.blue('plu-webpack begin to compile'));

  ctx.emit('compile.start');

  compiler.run((err: Error) => {
    rimraf.sync(ctx.tmpdir);

    if ( err ){
      console.log(chalk.red('plu-webpack compile failed'));
      ctx.emit('compile.failed', err);
      return;
    };

    console.log(chalk.blue('plu-webpack compile done'));

    ctx.emit('compile.end');
  })
}