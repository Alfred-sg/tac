const { chain } = require("@tac/webpack");

const webpackChain = chain({
  cwd: process.cwd()
}, {});
const tacConfig = webpackChain.toConfig();

console.log(process.cwd());

module.exports = ({config}) => {
  config.module.rules = tacConfig.module.rules;
  
  config.resolve.alias = {
    ...config.resolve.alias, 
    ...tacConfig.resolve.alias,
  };
  
  config.resolve.extensions = [
    ...config.resolve.extensions, 
    ...tacConfig.resolve.extensions, 
  ];

  return config;
};
  