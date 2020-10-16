// preset-env features
// https://github.com/babel/babel/blob/main/packages/babel-preset-env/data/shipped-proposals.js
// https://github.com/babel/babel/blob/master/packages/babel-compat-data/scripts/data/plugin-features.js
// https://github.com/babel/babel/blob/master/packages/babel-compat-data/data/plugins.json

module.exports = {
  // ignore babelrc in node_modules
  babelrc: false,
  presets: [
    '@babel/preset-react',
    ['@babel/preset-env', {
      modules: false,
      useBuiltIns: 'usage',
      corejs: { version: 3, proposals: true },
      shippedProposals: true,
      debug: true,
    }],
  ],
  plugins: [
    'babel-plugin-transform-jsxspreadchild',
  ],
}
