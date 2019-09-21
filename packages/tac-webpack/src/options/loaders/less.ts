import { Ctx, Opts } from "../../types";
import getCssLoader from "./common/getCssLoader";

/**
 * less 加载器
 * @param ctx {object} tac 上下文
 * @param opts {object} tac 选项 
 */
export default function apply(ctx: Ctx, opts: Opts) {
  const { config } = ctx;
  const { enableMiniCssExtract, css, enableCssModules } = opts;

  getCssLoader(config, {
    name: "less:src",
    test: /\.less$/,
    include: /src/,
    enableMiniCssExtract,
    enableCssModules,
    css,
  }).use('less')
    .loader(require.resolve('less-loader'));

  getCssLoader(config, {
    name: "less:node_modules",
    test: /\.less$/,
    include: /node_modules/,
    enableMiniCssExtract,
    enableCssModules,
    css,
  }).use('less')
    .loader(require.resolve('less-loader'));
}