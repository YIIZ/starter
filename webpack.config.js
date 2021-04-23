const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
  context: `${__dirname}/src`,
  resolve: {
    symlinks: false,
    modules: ['src', 'node_modules'],
    alias: { res: `${__dirname}/res` },
  },
  entry: {
    app: './app.js',
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: `${process.env.PUBLIC || ''}`,
    filename: '[name]-[chunkhash:8].js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules/whatwg-fetch'),
      ],
      loader: 'babel-loader',
    }, {
      test: path.resolve(__dirname, 'res'),
      type: 'asset/resource',
    }, {
      resourceQuery: /raw/,
      type: 'asset/source',
    }, {
      test: /\.val$/,
      loader: 'val-loader',
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new webpack.ProvidePlugin({
      fetch: ['whatwg-fetch', 'fetch'],
    }),
    new HTMLPlugin({
      template: 'index.html.ejs',
    }),
  ],
  experiments: {
    topLevelAwait: true,
  },
}

