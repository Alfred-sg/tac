import { server } from "@tac/webpack";
import { Context } from "@tac/utils";

/**
 * 启动调试环境
 */
export default (ctx: Context) => {
  ctx.registerCommand({
    name: 'server', 
    aliases: ["s", "dev", "d"],
    describe: "启动本地开发环境",
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
      }
    },
    handler: (ctx: Context) => {
      server(ctx, ctx.userConfig && ctx.userConfig.webpack);
    },
  });
}
