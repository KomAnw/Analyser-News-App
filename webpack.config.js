const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  entry: {
    index: './src/pages/index/index.js',
    about: './src/pages/about/about.js',
    analytics: './src/pages/analytics/analytics.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name][chunkhash].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: { loader: "babel-loader" },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          ('style-loader'),
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.woff(2)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: './vendor/fonts/[name].[ext]'
          }
        }
      },
      {
        test: /\.(jpe?g|png|svg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './images/[name].[ext]',
              esModule: false,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              }
            },
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      chunks: ['index'],
      filename: 'index.html',
      template: './src/pages/index/index.html',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      chunks: ['about'],
      filename: 'about.html',
      template: './src/pages/about/about.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      chunks: ['analytics'],
      filename: 'analytics.html',
      template: './src/pages/analytics/analytics.html'
    }),
    new MiniCssExtractPlugin({
      filename: './styles/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
    new WebpackMd5Hash(),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    }),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
  ]
}