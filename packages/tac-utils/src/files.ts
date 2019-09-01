import { readdirSync, statSync } from "fs";
import { resolve,  } from "path";

/**
 * 获取文件映射
 * @param {string} path 目录名
 * @param {RegExp} pattern 匹配的正则
 * @return {object} 文件映射
 */
export default function files(path: string, pattern = /\.(js|tsx?)$/){
  const result: { [propName: string]: any } = {};

  const fsList = readdirSync(path);
  fsList.map(fs => {
    const fsPath = resolve(path, fs);
    const fsStat = statSync(fsPath);

    if ( fsStat.isFile() && fsPath.match(pattern) ){
      const fileName = fs.replace(pattern, '');
      result[fileName] = fsPath;
    };
  });

  return result;
};