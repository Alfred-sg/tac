import * as TerserWebpackPlugin from "terser-webpack-plugin";
import * as OptimizeCssAssetsWebpackPlugin from "optimize-css-assets-webpack-plugin";
import { Ctx, Opts } from "../types";

/**
 * 优化
 * @param ctx {object} tac 上下文
 * @param opts {object} tac 选项 
 */
export default function apply(ctx: Ctx, opts: Opts) {
  const { config } = ctx;
  const { 
    mode = 'development', 
    compress = true, 
    terserOptions = {}, 
    folders, 
    common = 'common', 
    splitChunks = {},
    styleCacheGroup = {},
    jsCacheGroup = {},
  } = opts;

  if ( mode === 'production' && compress ) {
    // uglifyjs 不支持压缩 es6 代码，且不再维护
    // https://github.com/terser/terser#minify-options
    config.optimization.minimizer('js').use(
      TerserWebpackPlugin, [
        {
          terserOptions: {
            parse: {
              // We want terser to parse ecma 8 code. However, we don't want it
              // to apply any minification steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebook/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false,
              // Disabled because of an issue with Terser breaking valid code:
              // https://github.com/facebook/create-react-app/issues/5250
              // Pending further investigation:
              // https://github.com/terser-js/terser/issues/120
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebook/create-react-app/issues/2488
              ascii_only: true,
            },
          },
          // Use multi-process parallel running to improve the build speed
          // Default number of concurrent runs: os.cpus().length - 1
          parallel: true,
          // Enable file caching
          cache: true,
          sourceMap: false,
          ...terserOptions,
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
        ...styleCacheGroup,
      },
      js: {
        name: folders && folders.js ? `${folders.js}/${common}` : common,
        test: /[\\/]node_modules[\\/]/,
        chunks: 'all',
        minChunks: 2,
        priority: -20,
        ...jsCacheGroup,
      }
    },
    ...splitChunks
  });
}