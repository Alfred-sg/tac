import { Ctx } from "../types";

/**
 * 加载 loader 的文件路径
 * @param ctx {object} plu 上下文
 */
export default function apply(ctx: Ctx) {
  const { config, cwd } = ctx;

  ctx.emit("webpack.context.start", config);

  config.context(cwd);

  ctx.emit("webpack.context.end", config);
}