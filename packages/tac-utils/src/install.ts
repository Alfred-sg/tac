import { existsSync } from 'fs';
import { resolve } from 'path';
import spawn from 'cross-spawn';
import chalk from 'chalk';

interface Options {
  cwd?: string,
  npm?: string,
  save?: string,
  [propName: string]: any 
};

/**
 * 安装依赖
 * @param {string} name 依赖
 * @param {object} options 选项
 */
export default function install(name: string, options: Options = {}){
  const cwd = options.cwd || process.cwd();
  const npm = options.npm || 'npm';
  const modulePath = name && resolve(cwd, `./node_modules/${name}`);

  if ( name && existsSync(modulePath) ) return;

  let args = [npm === 'yarn' ? 'add' : 'install', name];
  if ( name && options.save ) args.push('--save');
  if ( name && options.dev ) args.push('--save-dev');

  console.log(chalk.green.bold(`Installing ${name ? name : 'dependencies'} ...`));

  const output = spawn.sync(npm, args, { 
    stdio: 'inherit'
  });

  if ( output.error ) console.log(chalk.red.bold(output.error));
  else console.log(chalk.green.bold(`${name ? name : 'dependencies'} installed`));
};