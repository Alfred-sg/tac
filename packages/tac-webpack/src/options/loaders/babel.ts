import { Ctx, Opts } from "../../types";

/**
 * babel 加载器
 * @param ctx {object} plu 上下文
 * @param opts {object} plu 选项 
 */
export default function apply(ctx: Ctx, opts: Opts) {
  const { config } = ctx;
  const { babel = {}, eslint } = opts;
  const { presets = [], ...babelOptions } = babel;
  const babelPresetPluOptions = babelOptions['babel-preset-plu'];
  delete babelOptions['babel-preset-plu'];

  ctx.emit("webpack.loaders.babel.start", config);

  const jsloader = config.module.rule('js')
    .test(/\.(jsx?|mjs)$/)
      .oneOf('babel')
        .use('babel')
          .loader(require.resolve('babel-loader'))
          .options({
            babelrc: false,
            presets: [
              [
                require.resolve('babel-preset-plu'), {
                  isBrowser: true,
                  isTS: true,
                  transformRuntime: true,
                  ...babelPresetPluOptions
                }
              ],
              ...presets
            ],
            exclude: [/node_modules/],
            ...babelOptions
          })
          .end()
        .end()

  if ( eslint ) {
    jsloader.oneOf('eslint')
      .use('eslint')
        .loader(require.resolve('eslint-loader'))
        .options(typeof eslint === 'object' ? eslint : {});
  }

  ctx.emit("webpack.loaders.babel.end", config);
}