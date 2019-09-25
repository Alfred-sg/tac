import lib from "@tac/plugin-storybook";
import Context from "../Context";

/**
 * 使用 storybook 开发库
 */
export default (ctx: Context) => {
  ctx.registerCommand('lib', (ctx: Context) => {
    lib(ctx, {});
  }, {
    desc: "调试库",
    options: {
    },
  });
}