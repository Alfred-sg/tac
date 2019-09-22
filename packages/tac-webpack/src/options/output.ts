import * as path from "path";
import { Ctx, Opts } from "../types";

/**
 * 输出
 * @param ctx {object} tac 上下文
 * @param opts {object} tac 选项 
 */
export default function apply(ctx: Ctx, opts: Opts) {
  const { config, cwd } = ctx;
  const { mode = 'development', folders, output, paths } = opts;
  if (!output) return;

  const dist = paths && paths.dist ? paths.dist : "dist";
  const { 
    filename, 
    chunkFilename, 
    publicPath = '', 
  } = output;

  config
    .output
    .path(path.resolve(cwd, `./${dist}`))
    .filename(
      filename ? 
        filename : 
        folders && folders.js ? 
          `${folders.js}/[name].js` : 
          '[name].js'
    )
    .chunkFilename(
      chunkFilename ? 
        chunkFilename : 
        folders && folders.js ? 
          `${folders.js}/[name].js` : 
          '[name].js'
    )
    .publicPath(mode === 'production' ? publicPath || './' : '/');
}