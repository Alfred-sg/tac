import { Ctx } from "../types";

/**
 * 监测
 * @param ctx {object} plu 上下文
 * @param opts {object} plu 选项 
 */
export default function apply(ctx: Ctx) {
  const { config, mode = 'development' } = ctx;

  ctx.emit("webpack.watch.start", config);

  config.watch(mode !== 'production' ? true : false);

  ctx.emit("webpack.watch.end", config);
}