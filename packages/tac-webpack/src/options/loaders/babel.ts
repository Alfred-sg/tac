import { Ctx, Opts } from "../../types";
import getBabelOptions from "./common/getBabelOptions";

/**
 * babel 加载器
 * @param ctx {object} tac 上下文
 * @param opts {object} tac 选项 
 */
export default function apply(ctx: Ctx, opts: Opts) {
  const { config } = ctx;
  const { babel = {}, eslint } = opts;
  const babelOptions = getBabelOptions(babel);

  const jsloader = config.module.rule('js')
    .test(/\.(jsx?|mjs)$/)
      .use('babel')
        .loader(require.resolve('babel-loader'))
        .options(babelOptions)
        .end()

  if ( eslint ) {
    jsloader
      .use('eslint')
        .loader(require.resolve('eslint-loader'))
        .options(typeof eslint === 'object' ? eslint : {});
  };
}