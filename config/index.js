'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
// 引入address
var address = require('address');
const path = require('path')
var EVN = require('./evn')

var target = {}

if (EVN === 'test') {
  target.api1 = 'http://10.158.41.45:8090'; // 短信
  target.api2 = 'http://cydweb.natapp1.cc'; // 业务
  target.api3 = 'http://img01.iambuyer.com'; // 图片
} else if (EVN === 'localTest') {
  target.api1 = 'http://10.158.41.45:8090'; // 短信
  target.api2 = 'http://cydweb.natapp1.cc'; // 业务
  target.api3 = 'http://img01.iambuyer.com'; // 图片
} else {
  target.api1 = 'http://api.iambuyer.com'; // 短信
  target.api2 = 'http://api.ruhexiu.com'; // 业务
  target.api3 = 'http://img01.iambuyer.com'; // 图片
}
module.exports = {
    dev: {
        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: { // 生产环境
          '/api2': {
            target: target.api2,
            changeOrigin: true,
            pathRewrite: {
              '^/api2': ''
            }
          },
          '/api1': {
            target: target.api1,
            changeOrigin: true,
            pathRewrite: {
              '^/api1': ''
            }
          },
          '/api': {
            target: target.api2,
            changeOrigin: true,
            pathRewrite: {
              '^/api': ''
            }
          }
        },

        // Various Dev Server settings
        host: address.ip(), // 获取本地ip，can be overwritten by process.env.HOST
        // host: '127.0.0.1', // can be overwritten by process.env.HOST
        port: 8082, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

        // Use Eslint Loader?
        // If true, your code will be linted during bundling and
        // linting errors and warnings will be shown in the console.
        useEslint: true,
        // If true, eslint errors and warnings will also be shown in the error overlay
        // in the browser.
        showEslintErrorsInOverlay: false,

        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: './',
        assetsPublicPath: '/',

        /**
         * Source Maps
         */

        productionSourceMap: false, //设为false可以减少打包时间和体积
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}
