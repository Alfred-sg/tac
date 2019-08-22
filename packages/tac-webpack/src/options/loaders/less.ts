import { loader } from 'mini-css-extract-plugin';
import { Ctx, Opts } from "../../types";

/**
 * less 加载器
 * @param ctx {object} plu 上下文
 * @param opts {object} plu 选项 
 */
export default function apply(ctx: Ctx, opts: Opts) {
  const { config } = ctx;
  const { enableMiniCssExtract = true, css = {}, enableCssModules = false } = opts;

  ctx.emit("webpack.loaders.less.start", config);

  let lessLoader = config.module.rule('less')
    .test(/\.less$/);

  if ( enableMiniCssExtract ) {
    lessLoader = lessLoader.oneOf('mini-css')
      .use('mini-css')
        .loader(loader)
        .end()
      .end()
  } else {
    lessLoader = lessLoader.oneOf('style')
      .use('style')
        .loader(require.resolve('style-loader'))
        .end()
      .end()
  }

  lessLoader
    .oneOf('css')
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
      .end()
    .oneOf('postcss')
      .use('postcss')
        .loader(require.resolve('postcss-loader'))
        .options({
          ident: 'postcss',
          plugins: [
            require('autoprefixer')("last 100 versions")
          ]
        })
        .end()
      .end()
    .oneOf('less')
      .use('less')
        .loader(require.resolve('less-loader'));

  ctx.emit("webpack.loaders.less.end", config);
}