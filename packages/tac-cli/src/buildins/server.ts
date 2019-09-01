import { resolve } from "path";
import { server } from "@tac/webpack";
import Context from "../Context";

/**
 * 启动调试环境
 */
export default (ctx: Context) => {
  ctx.registerCommand('server', (ctx: Context) => {
    const { cwd } = ctx;
    const opts = require(resolve(cwd, `.tac/dev.config.js`));
    server(ctx, opts);
  }, {
    desc: "启动本地开发环境",
    aliases: ["s", "dev", "d"],
    options: {
      port: {
        type: "number",
        default: 3001,
        alias: "p",
        description: "本地环境启动端口",
      },
      src: {
        type: "string",
        default: "src",
        alias: "s",
        description: "源文件夹名"
      },
      dist: {
        type: "string",
        default: "dist",
        alias: "d",
        description: "打包文件夹名"
      },
      html: {
        type: "string",
        default: "html",
        alias: "src",
        description: "模板文件夹名"
      },
      asset: {
        type: "string",
        default: "asset",
        alias: "a",
        description: "静态资源文件夹名"
      },
      tmp: {
        type: "string",
        default: "tmp",
        alias: "t",
        description: "临时文件夹名"
      },
    },
  });
}