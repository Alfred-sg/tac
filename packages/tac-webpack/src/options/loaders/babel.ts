import { Ctx, Opts } from "../../types";

/**
 * babel 加载器
 * @param ctx {object} tac 上下文
 * @param opts {object} tac 选项 
 */
export default function apply(ctx: Ctx, opts: Opts) {
  const { config } = ctx;
  const { babel = {}, eslint } = opts;
  const { presets = [], ...babelOptions } = babel;
  const babelPresetTacOptions = babelOptions['babel-preset-tac'] || {};
  delete babelOptions['babel-preset-tac'];

  ctx.emit("webpack.loaders.babel.start", config);

  const jsloader = config.module.rule('js')
    .test(/\.(jsx?|mjs)$/)
      .use('babel')
        .loader(require.resolve('babel-loader'))
        .options({
          babelrc: false,
          presets: [
            [
              require.resolve('@tac/babel-preset-tac'), {
                isBrowser: true,
                isTS: true,
                transformRuntime: true,
                ...babelPresetTacOptions,
              }
            ],
            ...presets
          ],
          exclude: [/node_modules/],
          ...babelOptions
        })
        .end()

  if ( eslint ) {
    jsloader
      .use('eslint')
        .loader(require.resolve('eslint-loader'))
        .options(typeof eslint === 'object' ? eslint : {});
  }

  ctx.emit("webpack.loaders.babel.end", config);
}