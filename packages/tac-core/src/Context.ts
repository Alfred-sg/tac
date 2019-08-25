import { realpathSync } from 'fs';
import * as yargs from 'yargs';
import * as EventEmitter from "events";

/**
 * 执行上下文
 */
export default class Context extends EventEmitter {
  private commands: Map<string, any> = new Map();
  private plugins: Function[];
  cwd: string;
  mode?: string;
  /** 命令行参数 */
  argv: {
    [x: string]: unknown;
    _: string[];
    $0: string;
  };

  constructor() {
    super();
    this.cwd = realpathSync(process.cwd());
    this.mode = process.env.NODE_ENV;
    this.argv = yargs.argv;

    this.buildin();
  };

  /**
   * 注册命令
   * @param name 命令
   * @param command 命令
   */
  registerCommand(name: string, command: Function) {
    this.commands.set(name, command);
  }

  /**
   * 执行命令
   * @param name 命令
   */
  execCommand(name: string) {
    const command = this.commands.get(name);
    command();
  }

  /**
   * 注册插件
   * @param plugin 插件
   */
  registerPlugin(plugin: Function) {
    this.plugins.push(plugin);
  }

  private buildin(){
    this.registerCommand('server', require('./commands/server').default);
  }

  run() {
    const name = this.argv._[0];
    console.log(name)
    if (this.commands.has(name)) {
      this.execCommand(name);
    }
  }
};
