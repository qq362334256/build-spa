/**
 * 开发环境webpack配置
 */
const path = require('path');
const merge = require('webpack-merge');


// 导出开发环境配置
module.exports = merge(require('./webpack.basic.js'), {
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
    }
});