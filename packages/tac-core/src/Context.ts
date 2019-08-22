import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import { EventEmitter } from "events";

interface Options {
  cwd: string,
  env?: string,
  argv?: object,
  rawArgv?: string,
}

/**
 * 执行上下文
 */
class Context extends EventEmitter {
  cwd: string;
  env?: string;
  argv?: object;
  rawArgv?: string;
  mode?: string;
  src?: string;
  assets?: string;

  constructor(options: Options){
    super();
    this.cwd = options.cwd;
    this.env = options.env;
    this.argv = options.argv;
    this.rawArgv = options.rawArgv;
  };
};

export default Context;
