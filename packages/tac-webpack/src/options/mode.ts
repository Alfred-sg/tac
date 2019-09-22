import { Ctx, Opts } from "../types";

/**
 * 环境
 * @param ctx {object} tac 上下文
 * @param opts {object} tac 选项 
 */
export default function apply(ctx: Ctx, opts: Opts) {
  const { config } = ctx;
  const { mode = 'development' } = opts;

  config.mode(mode);
}