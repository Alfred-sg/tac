import { EventEmitter } from 'events';

export interface Ctx extends EventEmitter {
  /** 执行路径 */
  cwd: string,
};