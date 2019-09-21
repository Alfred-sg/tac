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
    name: "css:src",
    test: /\.css$/,
    include: /src/,
    enableMiniCssExtract,
    enableCssModules,
    css,
  });

  getCssLoader(config, {
    name: "css:node_modules",
    test: /\.css$/,
    include: /node_modules/,
    enableMiniCssExtract,
    enableCssModules: false,
    css,
  });
};