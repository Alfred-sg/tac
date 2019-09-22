import { resolve } from "path";
import { files } from "@tac/utils";
import { Ctx, Opts } from "../types";

/**
 * 入口
 * @param ctx {object} tac 上下文
 * @param opts {object} tac 选项 
 */
export default function apply(ctx: Ctx, opts: Opts) {
  const { config, cwd } = ctx;
  const { mode = 'development', entry = {}, paths } = opts;

  const src = paths && paths.src ? paths.src : "src";
  const defaultEntry = files(resolve(cwd, src));
  for (let key in defaultEntry) {
    config.entry(key).add(defaultEntry[key]);
  }

  for (let key in entry) {
    config.entry(key).add(entry[key]);
  }

  if (mode !== 'production') {
    config.entry('webpackHotDevClient')
      .add(require.resolve('react-dev-utils/webpackHotDevClient'));
  }
}