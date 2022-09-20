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
    clean: true,
    path: `${__dirname}/dist`,
    publicPath: `${process.env.WEBPACK_PUBLIC || ''}`,
    filename: '[name]-[chunkhash:8].js',
    assetModuleFilename: '[name]-[hash][ext]',
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules/rui'),
        path.resolve(__dirname, 'node_modules/lib'),
        path.resolve(__dirname, 'node_modules/whatwg-fetch'),
      ],
      loader: 'babel-loader',
    }, {
      // test: path.resolve(__dirname, 'res'),
      test: /\.(png|jpg|gif)$/i,
      type: 'asset/resource',
    }, {
      resourceQuery: /res/,
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
    new webpack.HotModuleReplacementPlugin(),
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
  snapshot: {
    // enable node_modules reloading
    managedPaths: [],
  },
}

