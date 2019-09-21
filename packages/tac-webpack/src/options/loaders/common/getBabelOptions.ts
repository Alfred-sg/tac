interface Opts {
  presets?: any[],
  tac?: object,
  [key: string]: any,
};

/**
 * 获取 babel 选项
 * @param babelOptions 用户侧配置
 */
export default function getBabelOptions(opts: Opts) {
  const { presets = [], tac = {}, ...extra } = opts;

  return {
    babelrc: false,
    exclude: [/node_modules/],
    presets: [
      [
        require.resolve('@tac/babel-preset-tac'), {
          isBrowser: true,
          isTS: true,
          transformRuntime: true,
          ...tac,
        }
      ],
      ...presets,
    ],
    ...extra,
  };
}