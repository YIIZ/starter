module.exports = {
  // ignore babelrc in node_modules
  babelrc: false,
  presets: [
    '@babel/preset-react',
    ['@babel/preset-env', {
      modules: false,
      useBuiltIns: 'usage',
      corejs: { version: 3, proposals: true },
      debug: true,
    }],
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: false }],
    '@babel/plugin-proposal-do-expressions',
    '@babel/plugin-proposal-logical-assignment-operators',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-partial-application',
    ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
    'babel-plugin-transform-jsxspreadchild',
  ],
}
