const analize = false

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const WebpackPwaManifest = require('webpack-pwa-manifest')

const plugins = [
  new HtmlWebpackPlugin({
    template: 'src/index.html'
  }),
  new WebpackPwaManifest({
    name: 'MTG Card Holder',
    short_name: 'MTG Card Holder',
    description: 'Magic The Gathering Card Holder app',
    theme_color: '#000000',
    background_color: '#000000',
  }),
  new ExtractTextPlugin('styles.css'),
  new webpack.DefinePlugin({
    'process.env': {
      FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
      FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
      FIREBASE_DATABASE_URL: JSON.stringify(process.env.FIREBASE_DATABASE_URL),
      FIREBASE_PROJECT_ID: JSON.stringify(process.env.FIREBASE_PROJECT_ID),
      FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
      FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
    }
  }),
]

if (analize) {
  plugins.push(new BundleAnalyzerPlugin())
}

module.exports = plugins
