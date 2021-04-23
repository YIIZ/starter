const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const IS_DEV_SERVER = !!process.env.WEBPACK_DEV_SERVER

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
    }, {
      test: /\.s?css$/,
      use: [
        IS_DEV_SERVER ? 'style-loader' : MiniCssExtractPlugin.loader,
        { loader: 'css-loader', options: { importLoaders: 1 } },
        // 'postcss-loader',
        'sass-loader',
      ],
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
    new MiniCssExtractPlugin({ filename: '[name]-[chunkhash:8].css' }),
  ],
  experiments: {
    topLevelAwait: true,
  },
  snapshot: {
    // enable node_modules reloading
    managedPaths: [],
  },
}

