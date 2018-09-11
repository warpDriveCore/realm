const md5 = require('md5');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const md5Hash = md5(new Date().getTime());

module.exports = {
  devtool: 'cheap-module-source-map',
  // devtool: 'eval',
  entry: {
    app: './src/app/js/index.js',
  },
  output: {
    filename: `${md5Hash}.[name].js`,
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      { test: /\.(png|jpg|gif|svg)$/, loader: 'url-loader?limit=8192' },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin('public/', {
      root: __dirname,
      exclude: ['index.js'],
      verbose: true,
      dry: false,
    }),
    new ExtractTextPlugin({
      filename: `${md5Hash}.app.css`,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, 'src/app/assets'), to: path.resolve(__dirname, 'public/assets') },
    ]),
    new HtmlWebpackPlugin({
      template: './src/app/index.html',
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [
        `${md5Hash}.app.js`,
      ],
      append: true,
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 9000,
  },
};
