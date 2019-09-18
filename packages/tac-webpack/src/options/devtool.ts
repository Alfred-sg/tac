import { Ctx, Opts } from "../types";

/**
 * 解析
 * @param ctx {object} tac 上下文
 * @param opts {object} tac 选项 
 */
export default function apply(ctx: Ctx, opts: Opts) {
  const { config, mode } = ctx;
  const { devtool } = opts;

  ctx.emit("webpack.devtool.start", config);

  config.merge({ 
    devtool: mode !== 'production' ? devtool || 'source-map' : false 
  });

  ctx.emit("webpack.devtool.end", config);
}