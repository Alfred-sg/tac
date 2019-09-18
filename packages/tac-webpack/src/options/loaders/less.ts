import { loader } from 'mini-css-extract-plugin';
import { Ctx, Opts } from "../../types";

/**
 * less 加载器
 * @param ctx {object} tac 上下文
 * @param opts {object} tac 选项 
 */
export default function apply(ctx: Ctx, opts: Opts) {
  const { config } = ctx;
  const { enableMiniCssExtract = true, css = {}, enableCssModules = true } = opts;

  ctx.emit("webpack.loaders.less.start", config);

  let lessLoader = config.module.rule('less')
    .test(/\.less$/);

  if ( enableMiniCssExtract ) {
    lessLoader = lessLoader
      .use('mini-css')
        .loader(loader)
        .end()
  } else {
    lessLoader = lessLoader
      .use('style')
        .loader(require.resolve('style-loader'))
        .end()
  }

  lessLoader
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
      })
      .end()
    .use('less')
      .loader(require.resolve('less-loader'));

  ctx.emit("webpack.loaders.less.end", config);
}