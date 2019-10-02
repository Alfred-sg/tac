import * as yargs from "yargs";
import { ForkOptions } from 'child_process';

declare namespace Tac {
  interface UserConfig {
    plugins?: string[];
    [key: string]: any; 
  }

  interface RegisterCommand {
    /** 执行函数 */
    handler: Function,
    /** 命令名 */
    name: string,
    /** 别名 */
    aliases?: string[],
    /** 描述 */
    describe?: string,
    /** 选项 */
    options?: { 
      [key: string]: yargs.Options; 
    },
  }

  function plugin(ctx: Context): void;

  function PluginFactory(ctx: Context, opts?: { 
    [key: string]: any; 
  }): Plugin;

  class Context extends NodeJS.EventEmitter {
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
    userConfig: UserConfig;

    /** 注册命令 */
    registerCommand(command: RegisterCommand): void;
    registerCommand(command: string, handler?: Function, opts?: RegisterCommand): void;

    /** 执行命令 */
    execCommand(name: string): void;

    /** 注册插件 */
    registerPlugin(name: string, pluginFactory: Function): void;

    /** 执行 */
    run(): void;
  }

  function copy(source: string, target: string): void;

  function dirs(path: string): { [propName: string]: any };

  function files(path: string, pattern?: RegExp): { [propName: string]: any };

  function fork(
    modulePath: string, 
    args: any[], 
    options: ForkOptions,
  ): Promise<Function>;

  interface InstallOptions {
    cwd?: string,
    npm?: string,
    save?: string,
    [propName: string]: any 
  }

  function install(name: string, options: InstallOptions): void;

  interface ReadRcOptions {
    baseDir: string,
    type: string
  }

  function readRc(path: string, opts?: ReadRcOptions): { [key: string]: any; };
}

export = Tac;
