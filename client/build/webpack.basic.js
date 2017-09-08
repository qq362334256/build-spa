/**
 * 核心webpack配置
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


// 导出webpack基本配置
module.exports = {
    entry: { // 入口文件
        app: [
            'eventsource-polyfill',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
            path.join(__dirname, './../src', 'entry.js')
        ]
    },

    // 输出配置
    output: {
        filename: '[name].[hash].bundle.js',                 // 打包的文件名
        path: path.join(__dirname, './../static') // 输出目录
    },

    // loader模块配置
    module: {
        rules: [
            // { // css文件加载
            //     test: /\.css$/,
            //     use: [
            //         'style-loader', // style加载器
            //         'css-loader'    // css加载器
            //     ]
            // },
            { // css文件加载
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader", // style加载器
                    use: "css-loader"    // css加载器
                })
            }, { // less文件加载
                test: /\.less$/,
                use: [
                    'style-loader', // style加载器
                    'css-loader',   // css加载器
                    'less-loader'   // less加载器
                ]
            }, { // images图片加载
                test: /\.(jpg|jpeg|gif|png|pneg|svg)$/,
                use: [
                    'file-loader' // 文件加载器
                ]
            }, { // 字体加载
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader' // 文件加载器
                ]
            }, { // csv/tsv加载
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader' // csv加载器
                ]
            }, { // xml加载
                test: /\.xml$/,
                use: [
                    'xml-loader' // xml加载器
                ]
            }, { // html加载
                test: /\.html$/,
                use: [
                    'html-loader' // html加载器
                ]
            }
        ]
    },

    // 插件集合
    plugins: [
        // 清理静态文件目录
        new CleanWebpackPlugin(['static'], {
            root: path.join(__dirname, './../') // 配置清理根目录
        }),

        // 动态生成模块插件
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './../src', 'index.html') // 引入的初始模板
        }),

        // import导出时不加载无用代码
        // new UglifyJSPlugin(),

        // 指定环境
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production') // 生产环境production | development测试环境
             }
        }),

        // 抽取公共代码
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common' // 指定公共 bundle 的名称。
        }),

        // 单出抽出css文件
        new ExtractTextPlugin('styles.css'),


        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoErrorsPlugin()
    ],

    devtool: 'inline-source-map', // 生成打包模块文件的map
};

