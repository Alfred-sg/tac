## tac-webpack

### usage

```Typescript
// 生成 webpack 选项
function chain(ctx, opts): Webpackchain {}

// 调试服务器
function server(ctx, opts): void {}

// 打包
function build(ctx, opts): void {}
```

### ctx 上下文

| 选项 | 意义 | 默认值 |
| --- | --- | --- |
| mode | 模式，'development', 'none', 'production' | 'production' |
| cwd | 执行目录 | undefined |
| src | src 文件夹名，源代码 | 'src' |
| dist | dist 文件夹名，打包目标 | 'dist' |
| template | template 文件夹名，模板文件 | 'src' |
| assets | assets 文件夹名 | 'assets' |
| tmpdir | 临时文件夹名 | 'tmpdir' |
| argv | 命令行参数 | {} |

### opts 选项

| 选项 | 意义 | 默认值 |
| --- | --- | --- |
| entry | 入口文件，相对 src 目录 | {} |
| output | 输出 | {} |
| resolve | 解析 | {} |
| devtool | devtool | undefined |
| uglifyjsOptions | 压缩配置 | {} |
| devServer | 调试服务器配置 | {} |

参数校验、默认值、命令行参数撤除