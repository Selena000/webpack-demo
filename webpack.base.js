const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = {
  // entry: './src/index.js', // 入口文件
  entry: {
    index: './src/index.js',
    login: './src/login.js'
  },
  // devtool: 'source-map',
} 