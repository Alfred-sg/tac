import { Ctx } from "../types";

/**
 * 加载 loader 的文件路径
 * @param ctx {object} tac 上下文
 */
export default function apply(ctx: Ctx) {
  const { config, cwd } = ctx;

  config.context(cwd);
}