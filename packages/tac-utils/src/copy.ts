
import { existsSync, readFileSync, writeFileSync } from "fs";

/**
 * 拷贝文件
 * @param {string} source 源文件位置
 * @param {string} target 目标文件位置
 */
export default function copy(source: string, target: string){
  if ( !existsSync(target) ){
    const buffer = readFileSync(source);
    writeFileSync(target, buffer);
  };
}