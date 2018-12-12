const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLPlugin = require('html-webpack-plugin')
const sassFunctions = require('lib/scss/functions')

module.exports = (env, { mode, PROD = (mode ==='production') }) => ({
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
    // chunkhash not working in dev-server
    filename: PROD ? '[name]-[chunkhash:8].js' : '[name].js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules/lib'),
        path.resolve(__dirname, 'node_modules/whatwg-fetch'),
        path.resolve(__dirname, 'node_modules/bootstrap'),
      ],
      use: {
        loader: 'babel-loader',
        options: {
          // ignore babelrc in node_modules
          babelrc: false,
          presets: [ ['@babel/preset-env', { modules: false }] ],
          plugins: [
            ['@babel/plugin-transform-runtime', { corejs: 2, useESModules: true }],
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-class-properties',
            ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: false }],
            '@babel/plugin-proposal-do-expressions',
            '@babel/plugin-proposal-logical-assignment-operators',
            '@babel/plugin-proposal-nullish-coalescing-operator',
            '@babel/plugin-proposal-optional-chaining',
            // TODO wait https://github.com/tc39/proposal-partial-application
            ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
            'babel-plugin-transform-functional-jsx',
          ],
        },
      },
    }, {
      test: /\.s?css$/,
      use: [{
        // css extract do not support hot reload
        // NOTE if use style-loader on production
        // disable sourceMap for css-loader to clear local info
        loader: PROD ? MiniCssExtractPlugin.loader : 'style-loader',
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          plugins: [
            require('autoprefixer')(),
          ],
        },
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          functions: sassFunctions,
        },
      }],
    }, {
      loader: 'url-loader',
      test: path.resolve(__dirname, 'res'),
      type: 'javascript/auto', // fix json type
      options: {
        limit: 10000,
        name: '[name]-[hash:8].[ext]',
      },
    }, {
      // for inline svg in template, opt svg by hand(ImageOptim)
      test: /\.svg$/,
      loader: 'raw-loader',
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
      // fake instance methods and proposals in transform runtime is removed, add them by manual
      // https://github.com/babel/babel/pull/8547/files
      'Array.every': 'core-js/library/fn/array/every',
      'Array.find': 'core-js/library/fn/array/find',
      'String.padStart': 'core-js/library/fn/string/padStart',
      'String.repeat': 'core-js/library/fn/string/repeat',
      'Observable': 'core-js/library/fn/observable',
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:8].css',
    }),
    new HTMLPlugin({
      template: 'index.html.ejs',
      // https://github.com/kangax/html-minifier#options-quick-reference
      minify: {
        collapseWhitespace: PROD,
        removeComments: PROD,
      },
    }),
    // new (require('webpack-bundle-analyzer')).BundleAnalyzerPlugin(),
    // new (require('webpack-jarvis'))(),
  ],
})

// default disable comments for `webpack -p`
// https://github.com/webpack-contrib/terser-webpack-plugin/blob/master/src/index.js#L46
Object.defineProperty(require('terser-webpack-plugin').prototype, 'options', {
  get() { return this._options },
  set(o) { o.terserOptions.output.comments = false; this._options = o },
})
