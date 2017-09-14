/**
 * 生产环境webpack配置
 */
const path = require('path');
const merge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


// 导出生产环境配置
module.exports = merge(require('./webpack.basic.js'), {
    // 入口文件
    entry: {
        app: path.join(__dirname, './../src', 'entry.js'), // 应用入口
    },

    // 输出配置
    output: {
        filename: 'js/[name].[chunkhash].js', // 打包的文件名
        hashDigestLength: 10                  // 哈希值位数
    },

    // loader模块配置
    module: {
        rules: [
            { // css文件加载
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader', // style加载器
                    use: 'css-loader'         // css加载器
                })
            }, { // less文件加载
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader', // style加载器
                    use: [
                        'css-loader',         // css加载器
                        'less-loader'         // less加载器
                    ]
                })
            },
        ]
    }
});