import { resolve } from "path";
import { build } from "@tac/webpack";
import { Context } from "@tac/utils";

/**
 * 打包
 */
export default (ctx: Context) => {
  ctx.registerCommand({
    name: 'build', 
    describe: "打包脚本",
    aliases: ["b"],
    handler: (ctx: Context) => {
      const { cwd, argv } = ctx;
      const { environment = "prod" } = argv;
      const opts = require(resolve(cwd, `.tac/${environment}.config.js`));
      build(ctx, opts);
    }, 
    options: {
      environment: {
        type: "string",
        default: "prod",
        choices: ["prod", "pre", "daily"],// 线上、预发、日常
        alias: "e",
        description: "环境标识",
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