import { Ctx, Opts } from "../types";

/**
 * 解析
 * @param ctx {object} plu 上下文
 * @param opts {object} plu 选项 
 */
export default function apply(ctx: Ctx, opts: Opts) {
  const { config, mode = 'development' } = ctx;
  const { devtool } = opts;

  ctx.emit("webpack.devtool.start", config);

  config.merge({ 
    devtool: mode !== 'production' ? devtool || 'source-map' : false 
  });

  ctx.emit("webpack.devtool.end", config);
}