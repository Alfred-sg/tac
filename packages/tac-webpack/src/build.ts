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

  console.log(chalk.blue('tac-webpack begin to compile'));

  ctx.emit('build.start');
  ctx.emit('compile.start');

  compiler.run((err: Error, stats: webpack.Stats) => {
    rimraf.sync(ctx.tmpdir);

    if (stats.hasErrors()) {
      console.log(stats.toString({
        colors: true,
      }));
    }

    if ( err ){
      console.log(chalk.red('tac-webpack compile failed'));
      ctx.emit('compile.failed', err);
      return;
    };

    console.log(chalk.blue('tac-webpack compile done'));

    ctx.emit('compile.end');
    ctx.emit('build.end');
  });
}