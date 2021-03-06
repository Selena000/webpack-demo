const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')

const devConfig = {
  output: {
    path: path.resolve(__dirname, './dist'),
    // 每次打包都会生成Chunks
    // filename: '[name]_[chunkhash:8].js' // 可以用来做版本管理
    // filename: '[name][contenthash:8].js'
    filename: '[name].js'
    // hash：每次打包都会改变，每次都要重新生成文件
    // chunkhash：每个入口都会对应一个chunkhash，没有更改的文件不会被打包，
    // contenthash：？？
  },
  mode: 'development',  // mode 默认值是production
  module: { 
    // webpack默认只知道处理js和json
    // loader模块处理
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        // use: 'file-loader' // 专门处理静态文件
        // use: 'url-loader' // file-loader的强化版
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]', // ext是后缀
            outputPath: 'images/',
            limit: 204800 // 字节
          }
        }
      },
      {
        test: /\.css$/i,
        // use: ['style-loader', 'css-loader'] // 执行顺序：从右到左，
        // css-loader是生成一个css文件，
        // style-loader是创建一个style标签再头部，将该css文件内容放到style标签里
        // use: [MiniCssExtractPlugin.loader, 'css-loader'],
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff2|woff)/,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader'] 
        // postcss-loader提取到postcss.config.js文件
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader' // 配置放到.babelrc
        }
      }
    ],
    // plugins: [new HtmlWebpackPlugin()]
  },
  watch: false, // 耗性能 建议不开启
  watchOptions: {
    ignored: /node_modules/, // 
    aggregateTimeout: 300, // 监听到变化，等0.3s再执行
    poll: 1000 // 判断文件是否发生变化是不停第询问系统制定文件有没有变化，默认每秒询问1次
  },
  // plugins 可以子啊webpack运行到某个阶段
  plugins: [
    new HtmlWebpackPlugin({
      title: '首页',
      inject: 'body',
      template: './src/index.html',
      chunks: ['vendors_chunks', 'react_chunks', 'common_chunks', 'index'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      title: '首页',
      inject: 'body',
      template: './src/login.html',
      chunks: ['login'],
      filename: 'login.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // filename: '[name][contenthash:8].css',
      // chunkFilename: '[id][contenthash:8].css'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'cheap-module-eval-source-map',
  /*
    devtool: 
      source-map: 每个文件生成一个.map文件
      cheap: 较快 不包含列信息
      inline-source-map: 
  */
  devServer: {
    port: 8081,
    contentBase: './dist',
    open: true,
    proxy: { // 解决跨域问题，设置代理服务器
      '/api': {
        target: 'http://localhost:9000'
      }
    },
    hotOnly: true
    // 热模块替换
  },
  // 摇树
  optimization: {
    usedExports: true,
    // splitChunks 代码分割
    // 可以将第三库单独打包
    // 也可以定义规则
    splitChunks: {
      chunks: 'all', // async all initial
      name: 'vendors_chunks',
      minSize: 30000,
      // 还可以定义预加载: 加载完成之后，在网络空间时间内，加载它
      // import ( /* webpackPreload: true */ 'ChartingLibrary)
      cacheGroups: {
        vender: {
          test: /react|react-dom/,
          name: 'react_chunks',
          chunks: 'all',
          priority: 0
        },
        commons:{
          test:/[\\/]node_modules[\\/]/,
          name:"commom_chunks",
          chunks:"all",
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true//可设置是否重⽤用该chunk
        }
      }
    }
  }
} 
// contenthash chunkhash hash 的区别
// 为什么官网推荐使用chunkhash
// sourceMap
/*
  局部刷新步骤：
    1. devServer hotOnly: true
    2. plugin : new webpack.hotModuleReplacePlugin()
    3. 去掉contenthash、chunkhash
    注意启动HMR后，css抽离会不不⽣生效，还有不不⽀支持contenthash， chunkhash

    原理：先移除 在新增
*/

module.exports = webpackMerge(baseConfig, devConfig)