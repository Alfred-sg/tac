import * as Chain from "webpack-chain";
import { merge } from "lodash";
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

const DefaultCtx = {
  mode: 'development',
  src: 'src',
  dist: 'dist',
  template: 'src',
  assets: 'assets',
  tmpdir: '.tmp'
};

/**
 * 填充默认值
 * @param ctx 上下文
 */
function normalizeCtx(ctx: Ctx): void {
  merge(ctx, DefaultCtx);

  ctx.config = new Chain();
};

const DefaultOpts = {
  entry: {},
  output: {
    publicPath: '',
  },
  resolve: {
    extensions: ['.web.js', '.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {}
  },
  common: 'common', 
  babel: {},
  ts: {},
  css: {},
  img: {},
  font: {},
  enableMiniCssExtract: true,
  enableCssModules: true,
  compress: true, 
  uglifyjsOptions: {}, 
};

/**
 * 填充默认值
 * @param opts 选项
 */
function normalizeOpts(opts: Opts): void {
  merge(opts, DefaultOpts);
};

/**
 * 使用 webpack-chain 生成 webpack 配置
 * @param ctx 上下文
 * @param opts 选项
 */
export default function chain(ctx: Ctx, opts: Opts): Chain {
  normalizeCtx(ctx);
  normalizeOpts(opts);

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