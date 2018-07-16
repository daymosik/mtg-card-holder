const path = require('path')
const config = require('./webpack/config.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/app.tsx',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: config.rules,
  },
  plugins: config.plugins,
  optimization: {
    minimizer: [
      new UglifyJsPlugin(),
    ],
  },
}
