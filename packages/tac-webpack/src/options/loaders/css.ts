import { loader } from 'mini-css-extract-plugin';
import { Ctx, Opts } from "../../types";

/**
 * less 加载器
 * @param ctx {object} tac 上下文
 * @param opts {object} tac 选项
 */
export default function apply(ctx: Ctx, opts: Opts) {
  const { config } = ctx;
  const { enableMiniCssExtract = true, css = {}, enableCssModules = false } = opts;

  ctx.emit("webpack.loaders.css.start", config);

  let cssLoader = config.module.rule('css')
    .test(/\.css$/);

  if ( enableMiniCssExtract ) {
    cssLoader = cssLoader
      .use('mini-css')
        .loader(loader)
        .end()
  } else {
    cssLoader = cssLoader
      .use('style')
        .loader(require.resolve('style-loader'))
        .end()
  }

  cssLoader
    .use('css')
      .loader(require.resolve('css-loader'))
      .options({
        ...css,
        ...(enableCssModules ? {
          modules: true,
          localIdentName: '[local]-[hash:base64:8]'
        } : {}),
        importLoaders: 2
      })
      .end()
    .use('postcss')
      .loader(require.resolve('postcss-loader'))
      .options({
        ident: 'postcss',
        plugins: [
          require('autoprefixer')("last 100 versions")
        ]
      });

  ctx.emit("webpack.loaders.css.end", config);
}