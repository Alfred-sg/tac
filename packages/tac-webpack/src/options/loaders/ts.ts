import { Ctx, Opts } from "../../types";
import getBabelOptions from "./common/getBabelOptions";

/**
 * ts 加载器
 * @param ctx {object} tac 上下文
 * @param opts {object} tac 选项 
 */
export default function apply(ctx: Ctx, opts: Opts) {
  const { config } = ctx;
  const { 
    babel = {}, 
    ts = {}, 
    eslint 
  } = opts;
  const babelOptions = getBabelOptions(babel);

  const tsloader = config.module.rule('ts')
    .test(/\.tsx?$/)
      .use('babel')
        .loader(require.resolve('babel-loader'))
        .options(babelOptions)
        .end()
      .use('ts')
        .loader(require.resolve('ts-loader'))
        .options({
          transpileOnly: true,
          ...ts,
        })
        .end()

  if ( eslint ) {
    tsloader
      .use('eslint')
        .loader(require.resolve('eslint-loader'))
        .options(typeof eslint === 'object' ? eslint : {});
  };
}