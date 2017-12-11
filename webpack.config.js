
module.exports = options => {
  return {
    entry: './src/index.js',
    output: {
      path: __dirname,
      publicPath: '/',
      filename: 'bundle.js'
    },
    devServer: {
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
          ],
        },
      ],
    },
  }
}
