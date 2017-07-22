const PROD = process.argv.includes('-p')

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HTMLPlugin = require('html-webpack-plugin')

const css = new ExtractTextPlugin('app-[contenthash:8].css')

module.exports = {
  context: `${__dirname}/src`,
  entry: {
    app: 'app.js',
  },
  output: {
    path: `${__dirname}/dist`,
    // publicPath: '/',
    // chunkhash not working in dev-server
    filename: PROD ? '[name]-[chunkhash:8].js' : '[name].js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: ['babel-loader'],
    }, {
      test: /\.scss$/,
      use: (() => {
        const scssLoaders = [
          'css-loader?sourceMap',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                require('autoprefixer')(),
              ],
            },
          },
          'sass-loader?sourceMap',
        ]
        return PROD
          // css extract do not support hot reload
          ? css.extract({ use: scssLoaders })
          : ['style-loader', ...scssLoaders]
      })(),
    }, {
      test: /\.(png|jpg|gif|mp4)$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: '[path][name]-[hash:8].[ext]',
      },
    }, {
      // for inline svg in template
      test: /\.svg$/,
      use: ['raw-loader'],
    }],
  },
  plugins: [
    // process.env.NODE_ENV is defined by -p
    new HTMLPlugin({
      template: 'index.html.ejs',
      // https://github.com/kangax/html-minifier#options-quick-reference
      minify: !PROD ? false : {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    css,
  ],
}
