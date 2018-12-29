const path = require('path')
const config = require('./webpack/config.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/ts/app.tsx',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@app': path.join(__dirname, 'src/ts/app.tsx'),
      '@auth': path.join(__dirname, 'src/ts/auth.ts'),
      '@firebase-config': path.join(__dirname, 'src/ts/firebase.ts'),
      '@components': path.join(__dirname, 'src/ts/components'),
      '@models': path.join(__dirname, 'src/ts/models'),
      '@modules': path.join(__dirname, 'src/ts/modules'),
      '@services': path.join(__dirname, 'src/ts/services'),
      '@slices': path.join(__dirname, 'src/ts/slices'),
      '@utils': path.join(__dirname, 'src/ts/utils'),
    },
  },
  module: {
    rules: config.rules,
  },
  plugins: config.plugins,
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin(),
    ],
  },
}
