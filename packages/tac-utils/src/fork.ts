import { fork, ChildProcess, ForkOptions } from 'child_process';
import { CustomError } from "./types";

const childs = new Set();
let hasBound = false;

/**
 * 子进程平滑退出
 * @param proc 子进程
 */
function graceful(proc: ChildProcess){
  childs.add(proc);

  if (!hasBound){
    hasBound = true;
    let signal: string;
    
    ['SIGINT', 'SIGQUIT', 'SIGTERM'].forEach((ev: NodeJS.Signals) => {
      process.once(ev, () => {
        signal = ev;
        process.exit(0);
      });
    });

    // 主进程退出时，杀死子进程
    process.once('exit', () => {
      childs.forEach((child: ChildProcess) => {
        child.kill(signal);
      });
    });
  }
}

/**
 * fork
 * @param {string} modulePath 模块路径
 * @param {object} options 选项
 */
export default function (
  modulePath: string, 
  args: any[] = [], 
  options: ForkOptions = {},
){
  options.stdio = options.stdio || 'inherit';
  const proc: ChildProcess = fork(modulePath, args, options);
  graceful(proc);
 
  return new Promise((resolve, reject) => {
    proc.once('exit', code => {
      childs.delete(proc);
      if (code !== 0) {
        const err: CustomError = new Error(`${modulePath} ${args} exit with code ${code}`);
        err.code = code;
        reject(err);
      } else {
        resolve();
      }
    })
  })
}