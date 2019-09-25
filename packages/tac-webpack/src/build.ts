import * as webpack from "webpack";
import chalk from "chalk";
import config from "./chain";
import { normalize } from "./utils";
import { Ctx, Opts } from "./types";

const DefaultOpts = {
  mode: "production",
};

/**
 * 打包
 * @param ctx 上下文
 * @param opts 选项
 */
export default function build(ctx: Ctx, opts: Opts) {
  const fianlOpts: Opts = normalize(opts, DefaultOpts);
  const options: webpack.Configuration = config(ctx, fianlOpts).toConfig();
  const compiler = webpack(options);

  console.log(chalk.blue('tac-webpack begin to compile'));

  if (ctx.emit) ctx.emit('build.start');
  if (ctx.emit) ctx.emit('compile.start');

  compiler.run((err: Error, stats: webpack.Stats) => {
    if (stats.hasErrors()) {
      console.log(stats.toString({
        colors: true,
      }));
    }

    if ( err ){
      console.log(chalk.red('tac-webpack compile failed'));
      if (ctx.emit) ctx.emit('compile.failed', err);
      return;
    };

    console.log(chalk.blue('tac-webpack compile done'));

    if (ctx.emit) ctx.emit('compile.end');
    if (ctx.emit) ctx.emit('build.end');
  });
}