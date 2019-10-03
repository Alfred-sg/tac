import { realpathSync, existsSync } from 'fs';
import * as EventEmitter from "events";
import * as yargs from 'yargs';
import * as chokidar from "chokidar";
import * as warning from "warning";
import { readRc, UserConfig, RegisterCommand } from "@tac/utils";

/**
 * 执行上下文
 */
export default class Context extends EventEmitter {
  private commands: Map<string, RegisterCommand> = new Map();
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
  /** 配置文件路径 */
  configFile: string;
  /** 用户配置 */
  userConfig?: UserConfig;
  /** 用户加载的插件 */
  userPlugins: string[] = [];

  constructor() {
    super();
    this.parse();
    this.buildin();
    this.initConfig();
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
  }

  /**
   * 配置初始化
   */
  private initConfig(){
    const command = this.commands.get(this.command);
    if (!command){
      warning(command, `command ${this.command} is not existed.`);
      return;
    };

    // 根据别名获取配置文件
    [command.name].concat(
      (command.aliases || []).filter(alias => alias.length !== 1)
    ).some(name => {
      if (existsSync(`.tac/${name}.config.js`)){
        this.configFile = `.tac/${name}.config.js`;
      };

      return !!this.configFile;
    });

    this.userConfig = readRc(this.configFile);

    chokidar.watch(this.configFile).on("change", () => {
      this.userConfig = readRc(this.configFile);
      this.run();
    });
  }

  /**
   * 插件初始化
   */
  private initPlugins(){
    if (!this.userConfig || !this.userConfig.plugins) return;
    const { plugins } = this.userConfig;

    const initPlugin = (plugin: string, opts?: {[key: string]: any}) => {
      warning(existsSync(plugin), `plugin ${plugin} is not existed.`)

      const realPlugin = require(plugin).default.call(this, this, opts);
      this.userPlugins.push(plugin);
      this.registerPlugin(plugin, realPlugin);
    };

    plugins.forEach(plugin => {
      if (Array.isArray(plugin)){
        initPlugin(plugin[0], plugin[1]);
      } else {
        initPlugin(plugin);
      }
    });
  }

  /**
   * 通过 yargs 管理全局命令
   */
  private initCommands(){
    let inited: RegisterCommand[] = [];
    this.commands.forEach(command => {
      if (!inited.includes(command)){
        this.yargs.command({
          command: command.name,
          aliases: command.aliases,
          describe: command.describe,
          handler: (argv) => {
            this.argv = argv;
          }
        });
        inited.push(command);
      };
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
    if (command.aliases){
      command.aliases.forEach(alias => {
        this.commands.set(alias, command);
      });
    };
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
