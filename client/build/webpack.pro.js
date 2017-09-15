/**
 * 生产环境webpack配置
 */
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


// 导出生产环境配置
module.exports = merge(require('./webpack.basic.js'), {
    // 入口文件
    entry: {
        app: path.join(__dirname, './../src', 'entry.js'), // 应用入口
    },

    // 输出配置
    output: {
        filename: 'js/[name].[chunkhash].js',      // 打包的文件名
        chunkFilename: 'js/[name].[chunkhash].js', // 异步单独文件打包名
        hashDigestLength: 10                       // 哈希值位数
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
    },

    // 大文件打包警告
    performance: {
        maxAssetSize: 100000, // 打包打个文件超过100KB就发出警告
        maxEntrypointSize: 500000, // 打包最终生成的文件超过500KB就发出警告
    },

    // 插件集合
    plugins: [
        // 清理静态文件目录
        new CleanWebpackPlugin(['static'], {
            root: path.join(__dirname, './../') // 配置清理根目录
        }),

        // 指定环境
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production') // 生产环境production | development测试环境
            }
        }),

        // 让抽出模块的文件名可读
        new webpack.HashedModuleIdsPlugin(),

        //排序输出
        new webpack.optimize.OccurrenceOrderPlugin(), 

        // 单出抽出css文件
        new ExtractTextPlugin('css/[name].css'),

        // import导出时不加载无用代码
        new UglifyJSPlugin()
    ]
});