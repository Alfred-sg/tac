import test from "@tac/plugin-jest";
import { Context } from "@tac/utils";

/**
 * 使用 jest 测试
 */
export default (ctx: Context) => {
  ctx.registerCommand({
    name: 'test', 
    describe: "运行测试脚本",
    handler: (ctx: Context) => {
      test(ctx, {}).catch((e: Error) => {
        console.log(e);
      });
    }
  });
}