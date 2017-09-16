/**
 * 测试服务中间件
 */
const webpack = require('webpack');
const webConfig = require('./../../client/build/webpack.dev.js');
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');
const compile = webpack(webConfig);


// 导出中间件
module.exports = [
    devMiddleware(compile, {
        noInfo: true,    // 不显示其他不用信息
        quiet: false,    // 任何信息不会显示在控制台，默认为false
        publicPath: '/',  // 打包资源的访问路径

        // 文件监听设置
        watchOptions: {
            aggregateTimeout: 300,   // 当第一个文件更改，会在重新构建前增加延迟。这个选项允许 webpack 将这段时间内进行的任何其他更改都聚合到一次重新构建里。以毫秒为单位
            poll: true,             // 是否启用讯轮
            ignored: /node_modules/ // 排除需要监听的目录
        },

        // 请求体的头部设置
        headers: {
            'X-Custom-Header': 'yes' // 允许兼容ie8
        },

        // 需要显示的信息配置
        stats: {
            colors: true
        },

        open: true
    }),
    hotMiddleware(compile)
];