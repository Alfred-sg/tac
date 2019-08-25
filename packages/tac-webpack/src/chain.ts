import * as Chain from "webpack-chain";
import applyContext from "./options/context";
import applyDevtool from "./options/devtool";
import applyEntry from "./options/entry";
import applyMode from "./options/mode";
import applyLoaders from "./options/loaders";
import applyOptimization from "./options/optimization";
import applyOutput from "./options/output";
import applyPlugins from "./options/plugins";
import applyResolve from "./options/resolve";
import applyWatch from "./options/watch";
import { Ctx, Opts } from "./types";

export default function chain(ctx: Ctx, opts: Opts): Chain {
  ctx.config = new Chain();

  ctx.emit("webpack.start", opts);

  applyMode(ctx);
  applyDevtool(ctx, opts);
  applyContext(ctx);
  applyEntry(ctx, opts);
  applyOutput(ctx, opts);
  applyResolve(ctx, opts);
  applyDevtool(ctx, opts);
  applyWatch(ctx);
  applyLoaders(ctx, opts);
  applyPlugins(ctx, opts);
  applyOptimization(ctx, opts);
  
  ctx.emit("webpack.end", ctx.config);

  return ctx.config;
}