import * as path from "path";
import { Ctx, Opts } from "../types";

/**
 * 解析
 * @param ctx {object} tac 上下文
 * @param opts {object} tac 选项 
 */
export default function apply(ctx: Ctx, opts: Opts) {
  const { config, cwd, src } = ctx;
  const { resolve = {} } = opts;
  const { extensions = ['.web.js', '.js', '.jsx', '.ts', '.tsx', '.json'],
    alias = {} } = resolve;

  ctx.emit("webpack.resolve.start", config);

  extensions.forEach(key => {
    config.resolve.extensions.add(key);
  })

  const realAlias = {
    '@': src,
    ...alias,
  }
  Object.keys(realAlias).map(key => {
    config.resolve.alias.set(key, path.resolve(cwd, realAlias[key]));
  })

  ctx.emit("webpack.resolve.end", config);
}