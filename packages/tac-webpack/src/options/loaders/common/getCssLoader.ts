import * as Config from "webpack-chain";
import { loader } from 'mini-css-extract-plugin';

interface Opts {
  name: string,
  test: RegExp,
  include: RegExp,
  enableMiniCssExtract?: boolean,
  enableCssModules?: boolean,
  css?: object,
}

/**
 * 获取 babel 选项
 * @param babelOptions 用户侧配置
 */
export default function getCssLoader(config: Config, opts: Opts) {
  const { 
    name, 
    test, 
    include,
    enableMiniCssExtract = true, 
    enableCssModules = true, 
    css = {},
  } = opts;
  let cssLoader = config.module.rule(name)
    .test(test)
      .include
        .add(include)
        .end();

  if ( enableMiniCssExtract ) {
    cssLoader = cssLoader
      .use('mini-css')
        .loader(loader)
        .end()
  } else {
    cssLoader = cssLoader
      .use('style')
        .loader(require.resolve('style-loader'))
        .end()
  };

  cssLoader
    .use('css')
      .loader(require.resolve('css-loader'))
      .options({
        modules: enableCssModules ? true : false,
        importLoaders: 2,
        ...css,
      })
      .end()
    .use('postcss')
      .loader(require.resolve('postcss-loader'))
      .options({
        ident: 'postcss',
        plugins: [
          require('autoprefixer')("last 100 versions")
        ]
      });
  
  return cssLoader;
};
