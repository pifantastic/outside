const webpack = require('webpack');

const PRODUCTION = process.env.NODE_ENV === 'production';

var plugins = [];

if (PRODUCTION) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  );

  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    })
  );
}

module.exports = {
  entry: ['whatwg-fetch', 'babel-polyfill', './public/javascripts/index.js'],
  output: {
    path: './public/javascripts',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
      },
    ],
  },
  plugins: plugins,
};
