import * as path from "path";
import * as Webpack from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import * as CopyWebpackPlugin from "copy-webpack-plugin";
import * as Webpackbar from "webpackbar";
import * as FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import { Ctx, Opts } from "../types";

/**
 * 插件
 * @param ctx {object} plu 上下文
 * @param opts {object} plu 选项 
 */
export default function apply(ctx: Ctx, opts: Opts) {
  const { config, mode = 'development', src, cwd, assets } = ctx;
  const { folders, template, common = 'common', dist = 'dist', 
    enableMiniCssExtract = true, plugins } = opts;
  const htmls = ctx.helpers.files(
    template ? path.resolve(src, template) : src, /\.html$|\.ejs$/
  );

  ctx.emit("webpack.plugins.start", config);

  config.plugin('DefinePlugin')
    .use(Webpack.DefinePlugin, [{
      'process.env.NODE_ENV': mode === 'production' ? '"production"' : '"development"' 
    }]);

  Object.keys(htmls).map(fileName => {
    config.plugin('html-webpack-plugin')
      .use(HtmlWebpackPlugin, [{
        filename: folders && folders.html ? 
          `${folders.html}/${fileName}.html` : `${fileName}.html`,
        template: htmls[fileName],
        chunks: [ fileName, common ],
        showErrors: true
      }]);
  })

  config.plugin('OccurrenceOrderPlugin')
    .use(Webpack.optimize.OccurrenceOrderPlugin);

  if ( mode !== 'production' ) {
    config.plugin('HotModuleReplacementPlugin')
      .use(Webpack.optimize.OccurrenceOrderPlugin);
  }

  if ( enableMiniCssExtract ) {
    config.plugin('MiniCssExtractPlugin')
      .use(MiniCssExtractPlugin, [{
        filename: folders && folders.style ? `${folders.style}/[name].css` :  "[name].css"
      }]);
  }

  if ( mode === 'production' ) {
    config.plugin('CleanWebpackPlugin')
      .use(CleanWebpackPlugin, [
        [dist], {
          root: cwd
        }
      ]);
  }

  if ( mode === 'production' ) {
    config.plugin('CopyWebpackPlugin')
      .use(CopyWebpackPlugin, [{      
        from: assets,
        to: path.resolve(cwd, dist)
      }]);
  }

  config.plugin('Webpackbar').use(Webpackbar);
  config.plugin('FriendlyErrorsWebpackPlugin').use(FriendlyErrorsWebpackPlugin);

  if ( plugins ){
    config.merge({ 
      plugins
    });
  }

  ctx.emit("webpack.plugins.end", config);
}