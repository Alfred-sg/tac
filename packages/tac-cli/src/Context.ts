import { realpathSync } from 'fs';
import * as yargs from 'yargs';
import * as EventEmitter from "events";
import { RegisterCommandOpts } from "./types";

/**
 * 执行上下文
 */
export default class Context extends EventEmitter {
  private commands: Map<string, any> = new Map();
  private plugins: Map<string, any> = new Map();
  yargs: yargs.Argv;
  /** 命令行 */
  rawArgv: string[];
  /** 命令行参数 */
  argv: {
    [argName: string]: unknown;
    _: string[];
    $0: string;
    cwd?: string;
  };
  /** 执行路径 */
  cwd: string;
  /** 环境变量 */
  env: object;

  constructor() {
    super();
    this.rawArgv = process.argv.slice(2);
    this.yargs = yargs(this.rawArgv)
      .usage("Usage: tac <cmd> [options]")
      .locale("zh_CN");
    this.argv = yargs.argv;
    this.cwd = this.argv.cwd || realpathSync(process.cwd());
    this.env = process.env;

    this.buildin();
  };

  /**
   * 注册内置插件
   */
  private buildin(){
    this.registerPlugin('server', require('./buildins/server').default);
    this.registerPlugin('build', require('./buildins/build').default);
  }

  /**
   * 注册命令
   * @param name 命令
   * @param command 命令
   */
  registerCommand(name: string, command: Function, opts?: RegisterCommandOpts) {
    this.commands.set(name, command);

    if ( opts ) {
      const { command: cmd, desc = "", aliases, options = {} } = opts;
      this.yargs.command({
        command: cmd || name,
        aliases,
        describe: desc,
        // builder: options,
        // (yargs) => {
        //   console.log(111)
        //   Object.keys(options).map(key => {
        //     yargs.options(key, options[key]);
        //   });

        //   return yargs;
        // },
        handler: (argv) => {
          this.argv = argv;
        }
      });
      if (options) this.yargs.options(options);
    }
  }

  /**
   * 执行命令
   * @param name 命令
   */
  execCommand(name: string) {
    const command = this.commands.get(name);
    command(this);
  }

  /**
   * 注册插件
   * @param name 插件名
   * @param pluginFactory 插件生成器
   */
  registerPlugin(name: string, pluginFactory: Function) {
    this.plugins.set(name, pluginFactory.call(this, this));
  }

  run() {
    const name = this.argv._[0];
    if (this.commands.has(name)) {
      this.yargs.showHelp('log');
      console.log(this.argv);
      this.execCommand(name);
    } else {
      this.yargs.showHelp('log');
    };
  }
};
