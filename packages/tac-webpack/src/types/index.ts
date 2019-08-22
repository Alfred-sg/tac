import * as Config from "webpack-chain";
import { RequestHandler } from "express";

interface Entry {
  [key: string]: any 
}

interface Output {
  path?: string,
  filename?: string,
  chunkFilename?: string,
  publicPath?: string,
  [key: string]: any 
}

interface Resolve {
  extensions?: Array<string>,
  alias?: {[key: string]: any},
  [key: string]: any 
}

export interface DevServer {
  https?: string,
  host?: string,
  port?: number,
  beforeMiddlewares?: Array<RequestHandler>,
  afterMiddlewares?: Array<RequestHandler>,
}

export interface Opts {
  entry?: Entry,
  output?: Output,
  resolve?: Resolve,
  devtool?: string | boolean,
  uglifyjsOptions?: {[key: string]: any},
  devServer?: DevServer,
  [key: string]: any 
}

interface Helpers {
  files: Function,
  dirs: Function,
}

export interface Ctx {
  config: Config,
  mode: 'development' | 'none' | 'production',
  cwd: string,
  src: string,
  assets: string,
  tmpdir: string,
  argv: {[key: string]: any},
  helpers: Helpers,
  emit: Function,
}

export interface Stats {
  hasErrors: Function
}