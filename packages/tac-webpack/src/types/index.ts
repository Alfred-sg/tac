import * as webpack from "webpack";
import * as WebpackDevServer from 'webpack-dev-server';
import * as Config from "webpack-chain";
import { RequestHandler } from "express";

export interface Ctx {
  /** 执行路径 */
  cwd: string,
  /** 触发事件 */
  emit?: Function,
  /** webpack-chain 实例 */
  config: Config,
};
  
export interface DevServer extends WebpackDevServer.Configuration {
  beforeMiddlewares?: Array<RequestHandler>,
  afterMiddlewares?: Array<RequestHandler>,
}

export interface Opts extends webpack.Configuration {
  paths?: {
    /** src 文件夹名，默认 'src' */
    src: string;
    /** dist 文件夹名，默认 'dist' */
    dist: string;
    /** html 文件夹名，默认 'src' */
    html: string;
    /** assets 文件夹名，默认 'assets' */
    assets: string;
    /**  临时文件夹名，默认 '.tmp' */
    tmpdir: string;
  },
  /** 入口 */
  entry?: {
    [name: string]: string;
  },
  /** 输出 */
  output?: {
    /** 打包文件名 */
    filename?: string,
    /** 打包 chunk 文件名 */
    chunkFilename?: string,
    /** 资源加载路径 */
    publicPath?: string,
  },
  /** 解析 */
  resolve?: {
    extensions: string[],
    alias: {[key: string]: any},
  },
  /** babel 加载器选项 */
  babel?: {[key: string]: any},
  /** ts 加载器选项 */
  ts?: {[key: string]: any},
  /** 开启 eslint 检查 */
  eslint?: boolean | {[key: string]: any},
  /** css 加载器选项 */
  css?: {[key: string]: any},
  /** less 加载器选项 */
  less?: {[key: string]: any},
  /** font 加载器选项 */
  font?: {[key: string]: any},
  /** img 加载器选项 */
  img?: {[key: string]: any},
  /** 开启 css modules */
  enableCssModules?: boolean,
  /** 分离 css 样式 */
  enableMiniCssExtract?: boolean,
  /** 是否压缩脚本 */
  compress?: boolean,
  /** 压缩选项 */
  terserOptions?: {[key: string]: any},
  /** 分块选项 */
  splitChunks?: {[key: string]: any},
  /** 样式分块 */
  styleCacheGroup?: {[key: string]: any},
  /** 脚本分块 */
  jsCacheGroup?: {[key: string]: any},
  /** 调试服务器选项 */
  devServer?: DevServer,
  /** 打包目录 */
  folders?: {
    html?: string,
    js?: string,
    style?: string,
    img?: string,
  },
  /** 公共文件名 */
  common?: string,
  [key: string]: any 
}