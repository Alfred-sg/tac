import { build } from "@tac/webpack";
import { Context } from "@tac/utils";

/**
 * 打包
 */
export default (ctx: Context) => {
  ctx.registerCommand({
    name: 'build', 
    describe: "打包脚本",
    aliases: ["b", "pre", "prod"],
    options: {
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
      }
    },
    handler: (ctx: Context) => {
      build(ctx, ctx.userConfig && ctx.userConfig.webpack);
    }, 
  });
}