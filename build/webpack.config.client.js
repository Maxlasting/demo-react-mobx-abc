const webpack = require('webpack');
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');

const config = webpackMerge(baseConfig, {
  entry: {
    app: path.join(__dirname, '../client/index.js')
  },
  output: {
    filename: '[name].[hash].js'
  },
  plugins: [
    new HtmlPlugin({
      template: path.join(__dirname, '../public/index.html'),
      filename: 'index.html',
      title: ''
    })
  ]
})

if (process.env.NODE_ENV === 'development') {

  const publicPath = config.output.publicPath;

  config.entry.app = ['react-hot-loader/patch'].concat([config.entry.app]);

  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  config.devServer = {
    host: '0.0.0.0',
    port: 8081,
    contentBase: path.join(__dirname, '../dist'),
    hot: true,
    overlay: {
      errors: true
    },
    publicPath: publicPath,
    historyApiFallback: {
      index: `${publicPath}index.html`
    }
  }

}

module.exports = config;
















