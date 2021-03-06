import * as path from "path";
import * as Webpack from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import * as CopyWebpackPlugin from "copy-webpack-plugin";
import * as Webpackbar from "webpackbar";
import * as FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import { files } from "@tac/utils";
import { Ctx, Opts } from "../types";

/**
 * 插件
 * @param ctx {object} tac 上下文
 * @param opts {object} tac 选项 
 */
export default function apply(ctx: Ctx, opts: Opts) {
  const { config, cwd } = ctx;
  const { 
    mode = 'development',
    folders, 
    common = 'common', 
    enableMiniCssExtract = true, 
    plugins,
    paths,
    define = {},
  } = opts;
  const html = paths && paths.html ? paths.html : "src";
  const dist = paths && paths.dist ? paths.dist : "dist";
  const assets = paths && paths.assets ? paths.assets : "assets";
  const htmls = files(path.resolve(cwd, html), /\.html$|\.ejs$/);

  config.plugin('DefinePlugin')
    .use(Webpack.DefinePlugin, [{
      'process.env.NODE_ENV': mode === 'production' ? '"production"' : '"development"', 
      ...define, 
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
        to: path.resolve(cwd, dist),
      }]);
  }

  config.plugin('Webpackbar').use(Webpackbar);
  config.plugin('FriendlyErrorsWebpackPlugin').use(FriendlyErrorsWebpackPlugin);

  if ( plugins ){
    config.merge({ 
      plugins
    });
  };
}