import * as path from "path";
import { Ctx, Opts } from "../types";

/**
 * 输出
 * @param ctx {object} tac 上下文
 * @param opts {object} tac 选项 
 */
export default function apply(ctx: Ctx, opts: Opts) {
  const { config, cwd, dist, mode } = ctx;
  const { folders, output = {} } = opts;
  const { filename, chunkFilename, publicPath = '' } = output;

  ctx.emit("webpack.output.start", config);

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

  ctx.emit("webpack.output.end", config);
}