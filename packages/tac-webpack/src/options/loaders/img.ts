import { Ctx, Opts } from "../../types";

/**
 * 图片加载器
 * @param ctx {object} tac 上下文
 * @param opts {object} tac 选项 
 */
export default function apply(ctx: Ctx, opts: Opts) {
  const { config } = ctx;
  const { folders, img = {} } = opts;

  config.module.rule('img')
    .test(/\.(png|jpg|gif)\?*.*$/)
      .use('img')
        .loader(require.resolve('url-loader'))
        .options({
          name: folders && folders.img ? `${folders.img}/[hash].[ext]` : '[hash].[ext]',
          ...img,
        });
}