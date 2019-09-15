import { Ctx } from "../types";

/**
 * 环境
 * @param ctx {object} tac 上下文
 */
export default function apply(ctx: Ctx) {
  const { config, mode = 'development' } = ctx;

  ctx.emit("webpack.mode.start", config);

  config.mode(mode);

  ctx.emit("webpack.mode.end", config);
}