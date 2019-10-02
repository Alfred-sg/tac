import { realpathSync } from 'fs';
import * as yargs from 'yargs';
import * as EventEmitter from "events";
import { readRc, UserConfig, RegisterCommand } from "@tac/utils";

/**
 * 执行上下文
 */
export default class Context extends EventEmitter {
  private commands: Map<string, RegisterCommand> = new Map();
  // private aliasMap: Map<string, string[]> = new Map();
  private plugins: Map<string, (ctx: Context) => void> = new Map();

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
  /** 用户加载的插件 */
  userPlugins: string[] = [];

  constructor() {
    super();
    this.parse();
    this.buildin();
    this.initPlugins();
    this.initCommands();
  };

  /**
   * 解析命令行参数
   */
  private parse(){
    this.rawArgv = process.argv.slice(2);
    this.yargs = yargs(this.rawArgv)
      .usage("Usage: tac <cmd> [options]")
      .locale("zh_CN");
    this.argv = yargs.argv;
    this.env = process.env;
    this.cwd = realpathSync(process.cwd());
    this.command = this.argv._[0];
    this.userConfig = readRc(`.tac/${this.command}.config.js`);
  }

  /**
   * 插件初始化
   */
  private initPlugins(){
    const { plugins } = this.userConfig;
    if (!plugins) return;

    plugins.forEach(plugin => {
      if (Array.isArray(plugin)) {
        const realPlugin = require(plugin[0]).default.call(this, this, plugin[1]);
        this.userPlugins.push(plugin[0]);
        this.registerPlugin(plugin[0], realPlugin);
      } else {
        const realPlugin = require(plugin).default.call(this, this);
        this.userPlugins.push(plugin);
        this.registerPlugin(plugin, realPlugin);
      }
    });
  }

  /**
   * 通过 yargs 管理全局命令
   */
  private initCommands(){
    this.commands.forEach(command => {
      this.yargs.command({
        command: command.name,
        aliases: command.aliases,
        describe: command.describe,
        handler: (argv) => {
          this.argv = argv;
        }
      });
    });
  }

  /**
   * 注册内置命令
   */
  private buildin(){
    require('./buildins/server').default(this);
    require('./buildins/build').default(this);
    require('./buildins/test').default(this);
    require('./buildins/lib').default(this);
  }

  /**
   * 注册命令
   * @param command 命令
   */
  registerCommand(command: RegisterCommand): void {
    this.commands.set(command.name, command);
  }

  /**
   * 执行命令
   * @param name 命令
   */
  execCommand(name: string) {
    const command = this.commands.get(name);
    if (!command) return;

    const { handler, options } = command;
    if (options) this.yargs.options(options);
    this.yargs.showHelp('log');
    // this.userPlugins.filter(pluginName => {
    //   const plugin = this.plugins.get(pluginName);
    //   if ( plugin.type === "pre" ){

    //   }
    // })
    handler(this);
    this.userPlugins.filter(pluginName => {
      const plugin = this.plugins.get(pluginName);
      if (plugin) plugin(this);
    });
  }

  /**
   * 注册插件
   * @param name 插件名
   * @param CustomPlugin 插件
   */
  registerPlugin(name: string, plugin: (ctx: Context) => void) {
    this.plugins.set(name, plugin);
  }

  run() {
    if (this.commands.has(this.command)) {
      this.execCommand(this.command);
    } else {
      this.yargs.showHelp('log');
    };
  }
};
