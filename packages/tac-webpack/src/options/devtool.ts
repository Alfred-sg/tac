import { Ctx, Opts } from "../types";

/**
 * 解析
 * @param ctx {object} tac 上下文
 * @param opts {object} tac 选项 
 */
export default function apply(ctx: Ctx, opts: Opts) {
  const { config } = ctx;
  const { mode = 'development', devtool } = opts;

  config.merge({ 
    devtool: mode !== 'production' ? devtool || 'source-map' : false 
  });
}