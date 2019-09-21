import { resolve } from "path";
import { files } from "@tac/utils";
import { Ctx, Opts } from "../types";

/**
 * 入口
 * @param ctx {object} tac 上下文
 * @param opts {object} tac 选项 
 */
export default function apply(ctx: Ctx, opts: Opts) {
  const { config, cwd, src } = ctx;
  const { entry = {} } = opts;

  const defaultEntry = files(resolve(cwd, src));
  for (let key in defaultEntry) {
    config.entry(key).add(defaultEntry[key]);
  }

  for (let key in entry) {
    config.entry(key).add(entry[key]);
  }

  config.entry('webpackHotDevClient')
    .add(require.resolve('react-dev-utils/webpackHotDevClient'));
}