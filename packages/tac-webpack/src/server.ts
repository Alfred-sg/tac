import * as webpack from "webpack";
import * as WebpackDevServer from 'webpack-dev-server';
import openBrowser = require('react-dev-utils/openBrowser');
import chalk from "chalk";
import * as clipboardy from "clipboardy";
import { choosePort, prepareUrls } from 'react-dev-utils/WebpackDevServerUtils';
import errorOverlayMiddleware = require("react-dev-utils/errorOverlayMiddleware");
import { Ctx, DevServer, Opts } from "./types";
import config from "./chain";

/**
 * 启动调试服务器
 * @param ctx 上下文
 * @param opts 选项
 */
export default function server(ctx: Ctx, opts: Opts): void {
  const options: webpack.Configuration = config(ctx, opts).toConfig();
  const compiler = webpack(options);

  const { assets } = ctx;
  const devServer: DevServer = opts.devServer || {};
  const { https, host = '0.0.0.0', beforeMiddlewares = [], afterMiddlewares = [],
    ...devServerOptions } = devServer;
  const protocol = https ? 'https' : 'http';
  const port = devServer.port || ctx.argv.port || 3001;
  const urls = prepareUrls(protocol, host, port);

  // 开发服务器
  const server = new WebpackDevServer(compiler, {
    noInfo: true,// bundle 模块打包信息将被隐藏，错误和警告仍会显示
    quiet: true,// 错误或警告将被隐藏，启动信息仍会显示
    clientLogLevel: "error",// 日志级别
    inline: true,// 处理实时重载的 js 脚本以内联模式插入到页面中
    hot: true,// 模块热替换
    hotOnly: true,// 热替换时，编译失败时是否禁止刷新页面
    disableHostCheck: true,// 禁用 host 校验，允许 ihost 配置
    compress: true,// 压缩静态资源
    publicPath: (options.output || {}).publicPath,// publicPath 同步
    overlay: false,// 禁用默认的页面错误展示
    headers: {
      'access-control-allow-origin': '*',
    },
    host,
    contentBase: assets,// 静态资源目录
    watchContentBase: true,// 监听静态资源变更
    ...devServerOptions,
    before(app) {
      (beforeMiddlewares || []).forEach(middleware => {
        app.use(middleware);
      });
      app.use(errorOverlayMiddleware());
    },
    after(app) {
      (afterMiddlewares || []).forEach(middleware => {
        app.use(middleware);
      });
    },
  });

  let isFirstCompile = true;

  choosePort(host, port).then((realPort: number) => {
    compiler.hooks.done.tap('tac dev', (stats: webpack.Stats) => {
      if (stats.hasErrors()) {
        console.log(stats.toString({
          colors: true,
        }));

        // make sound
        // ref: https://github.com/JannesMeyer/system-bell-webpack-plugin/blob/bb35caf/SystemBellPlugin.js#L14
        if (process.env.SYSTEM_BELL !== 'none') {
          process.stdout.write('\x07');
        }
        return;
      };

      // refresh
      // server.sockWrite(server.sockets, 'content-changed');
  
      if ( isFirstCompile ){
        let copied;
        try {
          clipboardy.writeSync(urls.localUrlForBrowser);
          copied = chalk.dim('(copied to clipboard)');
        } catch (e) {
          copied = chalk.red('(copy to clipboard failed)');
        };

        console.log([
          `  App running at:`,
          `  - Local:   ${chalk.blue(`${urls.localUrlForTerminal} ${copied}`)}`,
          `  - Network: ${chalk.blue(`${urls.lanUrlForTerminal}`)}`,
        ].join('\n'));


        if ( openBrowser(urls.localUrlForBrowser) ){
          console.log('The browser tab has been opened!');
        };

        isFirstCompile = false;
      };
    });

    server.listen(realPort, host, (err: Error) => {
      if (err) {
        console.log(err.stack || err.message);
        return;
      };
    });
  }).catch((err: Error) => {
    console.log(err);
  });
  
  process.on('SIGINT', () => {
    server.close(() => {
      process.exit(0);
    });
  });

  process.on('SIGTERM', () => {
    server.close(() => {
      process.exit(0);
    });
  });
}