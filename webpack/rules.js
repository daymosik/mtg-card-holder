const ExtractTextPlugin = require('extract-text-webpack-plugin')

const rules = [
  { test: /\.tsx?$/, loader: 'ts-loader' },
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader',
    })
  }, {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'sass-loader']
    })
  },
  { test: /\.(png|jpg|jpeg|gif)$/, loader: 'file-loader' },
]

module.exports = rules
