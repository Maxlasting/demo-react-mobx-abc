const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const path = require('path');

const config = webpackMerge(baseConfig, {
  target: 'node',
  entry: {
    app: path.join(__dirname, '../client/app-server.js')
  },
  output: {
    filename: 'app-server.js',
    libraryTarget: 'commonjs2'
  }
});

module.exports = config;
















