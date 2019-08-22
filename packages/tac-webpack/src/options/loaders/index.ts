import { Ctx, Opts } from "../../types";
import applyBabel from "./babel";
import applyCss from "./css";
import applyFont from "./font";
import applyImg from "./img";
import applyLess from "./less";
import applyTs from "./ts";

/**
 * 加载器
 * @param ctx {object} plu 上下文
 * @param opts {object} plu 选项 
 */
export default function apply(ctx: Ctx, opts: Opts) {
  const { config } = ctx;
  const { rules, loaders } = opts;

  ctx.emit("webpack.loaders.start", config);

  applyBabel(ctx, opts);
  applyCss(ctx, opts);
  applyFont(ctx, opts);
  applyImg(ctx, opts);
  applyLess(ctx, opts);
  applyTs(ctx, opts);

  if ( rules || loaders ){
    config.merge({ 
      loaders: rules || loaders
    });
  }

  ctx.emit("webpack.loaders.end", config);
}