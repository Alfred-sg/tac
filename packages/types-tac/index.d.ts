import * as EventEmitter from "events";
import * as Config from "webpack-chain";

declare namespace tac {
  interface Context extends EventEmitter {
    /** 
     * 模式，默认 'development'  
     */
    mode: 'development' | 'none' | 'production',

    /** 
     * 执行路径 
     */
    cwd: string,

    /** 
     * 命令行参数 
     */
    argv: Argv,

    /** 
     * webpack-chain 实例 
     */
    config?: Config,
  }

  interface Argv {
    [argName: string]: any;
    _: string[];
    $0: string;

    /** 
     * 执行路径 
     */
    cwd?: string;
  }

  interface WebpackArgv extends Argv {
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
    tmp: string;
  }
}

export = tac;
