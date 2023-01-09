const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { NetlifyPlugin } = require('netlify-webpack-plugin');

const baseConfig = {
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      { 
        test: /\.ts$/i,
        use: 'ts-loader',
      },
      {
        test: /.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: "img/[name][ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[name][ext]',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new NetlifyPlugin({
      redirects: [
          {
              from: "/*",
              to: "/index.html",
              status: 200,
          },
      ]
    }),
    new CleanWebpackPlugin(),
    new EslingPlugin({ 
      extensions: 'ts',
    }),
    new CopyPlugin({
      patterns: [
          {
            from: path.resolve(__dirname, 'src/img'),
            to:   path.resolve(__dirname, 'dist/img')
          }
        ]
    }),
  ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
