const path = require('path');

module.exports = {
  mode: 'production',
  context: path.join(__dirname, './'),
  entry: './app/app.jsx',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'jsx-loader',
        exclude: /node_modules/,
        include: path.join(__dirname, 'app'),
      },
    ],
  },
};

// http://github.com/stripe/react-stripe-elements/blob/master/webpack.config.js

// @noflow
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const config = {
  mode: 'development',
  module: {
    rules: [{test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/}],
  },
  entry: {
    demo: ['./demo/demo/index.js'],
    async: ['./demo/async/main.js'],
    paymentIntents: ['./demo/intents/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'index.html',
      template: './demo/demo/index.html',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'async/index.html',
      template: './demo/async/index.html',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'intents/index.html',
      template: './demo/intents/index.html',
    }),
  ],
};

module.exports = config;
