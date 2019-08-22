import { Ctx, Opts } from "../../types";

/**
 * ts 加载器
 * @param ctx {object} plu 上下文
 * @param opts {object} plu 选项 
 */
export default function apply(ctx: Ctx, opts: Opts) {
  const { config } = ctx;
  const { babel = {}, ts = {}, eslint } = opts;
  const { presets = [], ...babelOptions } = babel;
  const babelPresetPluOptions = babelOptions['babel-preset-plu'];
  delete babelOptions['babel-preset-plu'];

  ctx.emit("webpack.loaders.ts.start", config);

  const tsloader = config.module.rule('ts')
    .test(/\.tsx?$/)
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
      .oneOf('ts')
        .use('ts')
          .loader(require.resolve('ts-loader'))
          .options({
            transpileOnly: true,
            ...ts
          })
          .end()
        .end()

  if ( eslint ) {
    tsloader.oneOf('eslint')
      .use('eslint')
        .loader(require.resolve('eslint-loader'))
        .options(typeof eslint === 'object' ? eslint : {});
  }

  ctx.emit("webpack.loaders.ts.end", config);
}