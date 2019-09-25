import * as fs from "fs";
import * as path from 'path';
import { buildDev } from "@storybook/core/server";
import options from "@storybook/react/dist/server/options";
// import * as Mustache from "mustache";
import { chain } from "@tac/webpack";
import stringify from "./stringify";
import { Ctx } from "./types";

function getWebpackConfig({
  rules,
  alias,
  extensions,
}){
  return `
module.exports = ({config}) => {
  config.module.rules = ${rules};
  
  config.resolve.alias = {
    ...config.resolve.alias, 
    ...${alias},
  };
  
  config.resolve.extensions = [
    ...config.resolve.extensions, 
    ...${extensions}, 
  ];

  return config;
};
  `;
}

export default function (ctx: Ctx, opts = {}) {
  // const tplsDir = path.resolve(__dirname, "../tpls");
  const configDir = path.resolve(__dirname, "../.storybook");

  // 写入 webpack 配置
  // const tacConfig = chain(ctx, opts).toConfig();
  // console.log(tacConfig.module);
  // const webpackConfig = getWebpackConfig({
  //   rules: stringify(tacConfig.module.rules),
  //   alias: stringify(tacConfig.resolve.alias),
  //   extensions: stringify(tacConfig.resolve.extensions),
  // });
  // fs.writeFileSync(
  //   path.resolve(configDir, "webpack.config.js"), 
  //   webpackConfig
  // );

  buildDev({
    ...options,
    configDir
  });
}