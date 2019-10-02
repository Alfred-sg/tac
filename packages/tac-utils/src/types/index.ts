import * as yargs from "yargs";

export class Context extends NodeJS.EventEmitter {
    yargs: yargs.Argv;
    /** 命令行 */
    rawArgv: string[];
    /** 命令行参数 */
    argv: yargs.Arguments;
    /** 命令 */
    command: string;
    /** 环境变量 */
    env: object;
    /** 执行目录 */
    cwd: string;
    /** 用户配置 */
    userConfig: { 
      [key: string]: any; 
    };
  }