'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
/**
 * 本地mock数据的配置，需要使用express
 * 
 */
const express = require('express');
const app = express();
var apiData = require('../apiData.json');
var apiRoutes = express.Router();
app.use('/api',apiRoutes);

/******************************* mock options end */
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: 'cheap-module-eval-source-map',//config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before(app){
      app.param(['userName','pageNo','pageSize'],function(req,res,next,value){
        console.log("app.param");
        next();
      }),
      app.get('/api/login',(req,res) =>{
        res.json({
          data:apiData.login,
          status:200
        })
      }),
      app.get('/api/suggest*',(req,res) =>{
        res.json({
          status:200,
          data:apiData.suggest.data
        })
      }),
      app.get('/api/search*',(req,res) =>{
        res.json({
          status:200,
          data:apiData.search.data
        })
      }),
      app.get('/api/province',(req,res) =>{
        res.json({
          status:200,
          data:apiData.province.data
        })
      }),
      app.get('/api/getMayLikes*',(req,res) =>{
        var userName = req.query.userName;
        var pageSize = req.query.pageSize;
        var pageNo = req.query.pageNo;
        var dataLen = apiData.maylike.data.length;
        var resultLen = dataLen - (pageNo-1)*10;
        var resultData = new Array();
        resultData = apiData.maylike.data.filter( (item,index) => {
          if(index>=(pageNo-1)*pageSize && index < pageNo*pageSize){
            return item;
          }
        });
        //resultData = resultData.splice((pageNo-1)*10,pageSize>resultLen?resultLen:pageSize);
        res.json({
          status:200,
          data:resultData,
          total:dataLen,
          pageNo:pageNo,
          pageSize:pageSize
        })
      }),
      app.post('/api/addPrd',(req,res) =>{
        res.json({
          status:200,
          data:{}
        })
      })
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
