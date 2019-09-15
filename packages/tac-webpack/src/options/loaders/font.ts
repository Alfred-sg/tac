import { Ctx, Opts } from "../../types";

/**
 * 字体加载器
 * @param ctx {object} tac 上下文
 * @param opts {object} tac 选项 
 */
export default function apply(ctx: Ctx, opts: Opts) {
  const { config } = ctx;
  const { folders, font = {} } = opts;

  ctx.emit("webpack.loaders.font.start", config);

  config.module.rule('font')
    .test(/\.(eot|woff|woff2|webfont|ttf)\?*.*$/)
      .use('woff')
        .loader(require.resolve('url-loader'))
        .options({
          name: folders && folders.img ? `${folders.img}/[hash].[ext]` : '[hash].[ext]',
          ...font
        });

  ctx.emit("webpack.loaders.font.end", config);
}