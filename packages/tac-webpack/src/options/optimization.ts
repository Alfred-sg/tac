import * as UglifyjsWebpackPlugin from "uglifyjs-webpack-plugin";
import * as OptimizeCssAssetsWebpackPlugin from "optimize-css-assets-webpack-plugin";
import { Ctx, Opts } from "../types";

/**
 * 优化
 * @param ctx {object} plu 上下文
 * @param opts {object} plu 选项 
 */
export default function apply(ctx: Ctx, opts: Opts) {
  const { config, mode = 'development' } = ctx;
  const { compress = true, uglifyjsOptions = {}, folders, common = 'common', 
    splitChunksOptions = {} } = opts;

  ctx.emit("webpack.optimization.start", config);

  if ( mode === 'production' && compress ) {
    config.optimization.minimizer('js').use(
      UglifyjsWebpackPlugin, [
        {
          cache: true,
          parallel: true,
          ...uglifyjsOptions
        }
      ]
    );

    config.optimization.minimizer('css').use(
      OptimizeCssAssetsWebpackPlugin, [
        {
          cssProcessorOptions: { safe: true }
        }
      ]
    );
  }

  config.optimization.minimize(mode === 'production' && compress ? true : false);

  config.optimization.splitChunks({
    cacheGroups: {
      styles: {
        name: folders && folders.style ? `${folders.style}/${common}` : common,
        test: /\.(css|less|scss|sass)$/,
        chunks: 'all',
        minChunks: 2,
        priority: 20,
        ...splitChunksOptions
      },
      js: {
        name: folders && folders.js ? `${folders.js}/${common}` : common,
        test: /[\\/]node_modules[\\/]/,
        chunks: 'all',
        minChunks: 2,
        priority: -20,
        ...splitChunksOptions
      }
    }
  });

  ctx.emit("webpack.optimization.end", config);
}