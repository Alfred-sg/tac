import * as path from "path";
import { Ctx, Opts } from "../types";

/**
 * 解析
 * @param ctx {object} tac 上下文
 * @param opts {object} tac 选项 
 */
export default function apply(ctx: Ctx, opts: Opts) {
  const { config, cwd } = ctx;
  const { resolve, paths } = opts;
  if (!resolve) return;

  const src = paths && paths.src ? paths.src : "src";
  const { 
    extensions = ['.web.js', '.js', '.jsx', '.ts', '.tsx', '.json'],
    alias = {}, 
  } = resolve;

  extensions.forEach(key => {
    config.resolve.extensions.add(key);
  });

  const realAlias = {
    '@': path.resolve(cwd, src),
    ...alias,
  };
  
  Object.keys(realAlias).map(key => {
    config.resolve.alias.set(key, path.resolve(cwd, realAlias[key]));
  });
}