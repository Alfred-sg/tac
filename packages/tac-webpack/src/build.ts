import * as webpack from "webpack";
import chalk from "chalk";
import * as rimraf from "rimraf";
import { Ctx, Opts } from "./types";
import config from "./chain";

/**
 * 打包
 * @param ctx 上下文
 * @param opts 选项
 */
export default function build(ctx: Ctx, opts: Opts) {
  const options: webpack.Configuration = config(ctx, opts).toConfig();
  const compiler = webpack(options);

  console.log(chalk.blue('plu-webpack begin to compile'));

  ctx.emit('build.start');
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
    ctx.emit('build.end');
  })
}