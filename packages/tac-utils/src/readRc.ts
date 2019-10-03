import { existsSync } from "fs";
import { resolve } from "path";

interface Options {
  baseDir?: string,
  type?: string
};

/**
 * 获取用户配置
 * @param {string} path 文件路径
 * @param {object} opts 选项
 * @return {object} 用户配置
 */
export default function readRc(path: string, opts?: Options): undefined | { [key: string]: any; } {
  const baseDir = opts && opts.baseDir ? opts.baseDir : process.cwd();
  const type = opts && opts.type ? opts.type : "js";
  const realPath = resolve(baseDir, path);

  let result;
  if (!existsSync(realPath)) return result;

  switch(type){
    case "js":
    case "json":
      result = require(realPath);
      break;
  };

  return result;
}