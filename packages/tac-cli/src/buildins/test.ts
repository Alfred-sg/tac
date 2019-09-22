import test from "@tac/plugin-jest";
import Context from "../Context";

/**
 * 使用 jest 测试
 */
export default (ctx: Context) => {
  ctx.registerCommand('test', (ctx: Context) => {
    test(ctx, {}).catch((e: Error) => {
      console.log(e);
    });
  }, {
    desc: "运行测试脚本",
    options: {
    },
  });
}