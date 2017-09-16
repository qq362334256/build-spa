/**
 * 核心webpack配置
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    clientBuild: {
        assetsUrl,
        libList
    }
} = require('./../../webConfig');


// 导出webpack基本配置
module.exports = {
    // 别名设置
    // resolve: {
    //     alias: {
    //         jquery: 'jquery/src/jquery',
    //         webConfig$: path.join(__dirname, './../../webConfig.js')
    //     }
    // },

    context: path.join(__dirname, './client/build'), // 构建的上下文

    // 入口文件
    entry: {
        vendor: libList // 插件模块
    },

    // 输出配置
    output: {
        publicPath: assetsUrl,                     // 打包资源加载域
        path: path.join(__dirname, './../static'), // 输出目录
        crossOriginLoading: 'anonymous'            // 不带凭据启用跨域加载
    },

    // loader模块配置
    module: {
        // noParse: eval(`/${ noImportModule.join('|') }/`), // 忽略不应该loader的模块
        rules: [
            { // images图片加载
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
        // 动态生成模块插件
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './../src', 'index.html') // 引入的初始模板
        }),

        // 抽取lib插件代码
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'common'] // 指定公共 bundle 的名称。
        })
    ],
};

