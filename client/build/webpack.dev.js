/**
 * 开发环境webpack配置
 */
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const {
    server: {
        host: serverHost,
        port: serverPort
    }
} = require('./../../webConfig');


// 导出开发环境配置
module.exports = merge(require('./webpack.basic.js'), {
    devtool: 'inline-source-map', // 生成打包模块文件的map

    // 入口文件
    entry: {
        app: [ // 应用入口
            'eventsource-polyfill',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
            path.join(__dirname, './../src', 'entry.js')
        ]
    },

    // 输出配置
    output: {
        filename: 'js/[name].js',           // 打包的文件名
        strictModuleExceptionHandling: true // 模块全部异常时全部抛出
    },

    // loader模块配置
    module: {
        rules: [
            { // css文件加载
                test: /\.css$/,
                use: [
                    'style-loader', // style加载器
                    'css-loader'    // css加载器
                ]
            }, { // less文件加载
                test: /\.less$/,
                use: [
                    'style-loader', // style加载器
                    'css-loader',   // css加载器
                    'less-loader'   // less加载器
                ]
            },
        ]
    },

    // 插件集合
    plugins: [
        // 指定环境
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development') // 生产环境production | development测试环境
            }
        }),

        // 启用hot加载
        new webpack.HotModuleReplacementPlugin(),

        // 执行完毕后自动打开游览器
        new OpenBrowserPlugin({ url: `http://${serverHost}:${serverPort}` })
    ]
});