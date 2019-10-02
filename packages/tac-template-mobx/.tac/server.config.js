module.exports = {
  webpack: {
    babel: {
      plugins: [
        [
          require.resolve('babel-plugin-import'),
          {
            "libraryName": "antd",
            "style": 'css'
          }
        ]
      ],
    },
    enableCssModules: false,
    enableMiniCssExtract: false,
  }
}