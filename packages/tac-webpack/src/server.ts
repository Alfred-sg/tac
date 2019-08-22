import * as webpack from "webpack";
import * as WebpackDevServer from 'webpack-dev-server';
// import openBrowser from 'react-dev-utils/openBrowser';
import chalk from "chalk";
import * as clipboardy from "clipboardy";
import { choosePort, prepareUrls } from 'react-dev-utils/WebpackDevServerUtils';
// import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware';
import { Ctx, DevServer, Opts, Stats } from "./types";
import config from "./config";

export default function (ctx: Ctx, opts: Opts) {
  const options = config(ctx, opts);
  const compiler = webpack(options);

  const devServer: DevServer = opts.devServer || {};
  const { https, host = '0.0.0.0', beforeMiddlewares = [], afterMiddlewares = [],
    ...devServerOptions } = devServer;
  const protocol = https ? 'https' : 'http';
  const port = devServer.port || ctx.argv.port || 3001;
  const urls = prepareUrls(protocol, host, port);

  // 开发服务器
  const server = new WebpackDevServer(compiler, {
    noInfo: true,
    inline: true,// 处理实时重载的 js 脚本以内联模式插入到页面中
    hot: true,// 模块热替换
    hotOnly: true,// 热替换时，编译失败时是否禁止刷新页面
    quiet: true,
    headers: {
      'access-control-allow-origin': '*',
    },
    ...devServerOptions,
    before(app) {
      (beforeMiddlewares || []).forEach(middleware => {
        app.use(middleware);
      });
      // app.use(errorOverlayMiddleware());
    },
    after(app) {
      (afterMiddlewares || []).forEach(middleware => {
        app.use(middleware);
      });
    },
  });

  let isFirstCompile = true;

  choosePort(host, port).then((realPort: number) => {
    compiler.hooks.done.tap('plutarch dev', (stats: Stats) => {
      if (stats.hasErrors()) {
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
          copied = console.log(chalk.dim('(copied to clipboard)'));
        } catch (e) {
          copied = console.log(chalk.red('(copy to clipboard failed)'));
        };

        console.log([
          `  App running at:`,
          `  - Local:   ${chalk.blue(`${urls.localUrlForTerminal} ${copied}`)}`,
          `  - Network: ${chalk.blue(`${urls.lanUrlForTerminal}`)}`,
        ].join('\n'));


        // if ( openBrowser(urls.localUrlForBrowser) ){
        //   console.log('The browser tab has been opened!');
        // };

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