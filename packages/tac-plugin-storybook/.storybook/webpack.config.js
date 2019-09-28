const { chain } = require("@tac/webpack");

const webpackChain = chain({
  cwd: process.cwd()
}, {});
const tacConfig = webpackChain.toConfig();

module.exports = ({config}) => {
  config.module.rules = tacConfig.module.rules;
  
  config.resolve.alias = {
    ...config.resolve.alias, 
    ...tacConfig.resolve.alias,
    "@storybook/react": require.resolve("@storybook/react"),
  };
  
  config.resolve.extensions = [
    ...config.resolve.extensions, 
    ...tacConfig.resolve.extensions, 
  ];

  return config;
};
  