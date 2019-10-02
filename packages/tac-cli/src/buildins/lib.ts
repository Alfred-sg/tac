import lib from "@tac/plugin-storybook";
import { Context } from "@tac/utils";

/**
 * 使用 storybook 开发库
 */
export default (ctx: Context) => {
  ctx.registerCommand({
    name: 'lib', 
    describe:"调试库",
    handler: (ctx: Context) => {
      lib(ctx, {});
    }
  });
}