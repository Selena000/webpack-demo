const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  // entry: './src/index.js', // 入口文件
  entry: {
    index: './src/index.js',
    login: './src/login.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    // 每次打包都会生成Chunks
    // filename: '[name]_[chunkhash:8].js' // 可以用来做版本管理
    filename: '[name][contenthash:8].js'
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
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(woff2|woff)/,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.less$/,
        use: ['css-loader', 'less-loader', 'postcss-loader'] 
        // postcss-loader提取到postcss.config.js文件
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
      chunks: ['index'],
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
      filename: '[name][contenthash:8].css',
      chunkFilename: '[id][contenthash:8].css'
    })
  ]
} 
