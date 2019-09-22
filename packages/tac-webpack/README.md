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
| cwd | 执行目录 | undefined |

### opts 选项

| 选项 | 意义 | 默认值 |
| --- | --- | --- |
| mode | 模式，'development', 'none', 'production' | 'production' |
| entry | 入口文件，相对 src 目录 | {} |
| output | 输出 | {} |
| resolve | 解析 | {} |
| rules | 加载器 | [] |
| babel | babel 加载器选项 | {} |
| ts | ts 加载器选项 | {} |
| eslint | 开启 eslint 检查 | undefined |
| css | css 加载器选项 | {} |
| less | less 加载器选项 | {} |
| font | font 加载器选项 | {} |
| img | img 选项 | {} |
| enableCssModules | 开启 css modules | true |
| enableMiniCssExtract | 分离 css 样式 | true |
| compress | 是否压缩脚本 | undefined |
| devtool | devtool | undefined |
| terserOptions | 压缩选项 | {} |
| splitChunks | 分块选项 | {} |
| styleCacheGroup | 样式分块 | {} |
| jsCacheGroup | 脚本分块 | {} |
| plugins | 插件 | [] |
| devServer | 调试服务器配置 | {} |
| folders | 打包目录 | undefined |
| common | 公共文件名 | "common" |
| paths | 路径名 | {} |
| paths.src | src 文件夹名，源代码 | 'src' |
| paths.dist | dist 文件夹名，打包目标 | 'dist' |
| paths.template | template 文件夹名，模板文件 | 'src' |
| paths.assets | assets 文件夹名 | 'assets' |
| paths.tmpdir | 临时文件夹名 | 'tmpdir' |