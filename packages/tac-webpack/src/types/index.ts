import * as webpack from "webpack";
import * as WebpackDevServer from 'webpack-dev-server';
import * as Config from "webpack-chain";
import { RequestHandler } from "express";
import { EventEmitter } from 'events';
  
export interface DevServer extends WebpackDevServer.Configuration {
  beforeMiddlewares?: Array<RequestHandler>,
  afterMiddlewares?: Array<RequestHandler>,
}

export interface Opts extends webpack.Configuration {
  entry?: {
    [name: string]: string;
  },
  devServer?: DevServer,
  uglifyjsOptions?: {[key: string]: any},
  plugins?: any[],
  folders?: {
    html?: string,
    js?: string,
    style?: string,
    img?: string,
  },
  [key: string]: any 
}

export interface Argv {
  _: string[];
  $0: string;

  /** 
   * 执行路径 
   */
  cwd?: string;

  /** 
   * src 文件夹名，默认 'src' 
   */
  src: string;

  /** 
   * dist 文件夹名，默认 'dist' 
   */
  dist: string;

  /** 
   * html 文件夹名，默认 'src' 
   */
  html: string;

  /** 
   * assets 文件夹名，默认 'assets' 
   */
  asset: string;

  /** 
   * 临时文件夹名，默认 '.tmp' 
   */
  tmpdir: string;

  [argName: string]: any;
}

export interface Ctx extends EventEmitter {
  /** 模式，默认 'development'  */
  mode: 'development' | 'none' | 'production',
  /** 执行路径 */
  cwd: string,
  /** src 文件夹名，默认 'src' */
  src: string,
  /** dist 文件夹名，默认 'dist' */
  dist: string,
  /** template 文件夹名，默认 'src' */
  template: string,
  /** assets 文件夹名，默认 'assets' */
  assets: string,
  /** 临时文件夹名，默认 '.tmp' */
  tmpdir: string,
  /** webpack-chain 实例 */
  config: Config,
  /** 命令行参数 */
  argv: Argv,
};