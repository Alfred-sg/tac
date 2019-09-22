import { merge } from "lodash";

/**
 * 填充默认值
 * @param opts 选项
 * @param defaultOpts 默认选项
 */
export function normalize(opts: object, defaultOpts: object): object {
  merge(opts, defaultOpts);
  
  return opts;
};