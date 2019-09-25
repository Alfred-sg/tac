module.exports = ({config}) => {
  const tacConfig = {{tacConfig}};
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