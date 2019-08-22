import * as path from "path";
import { Ctx, Opts } from "../types";

/**
 * 输出
 * @param ctx {object} plu 上下文
 * @param opts {object} plu 选项 
 */
export default function apply(ctx: Ctx, opts: Opts) {
  const { config, cwd, mode = 'development' } = ctx;
  const { output = {} } = opts;
  const { dist = 'dist', folders, filename, chunkFilename, 
    publicPath = '' } = output;

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