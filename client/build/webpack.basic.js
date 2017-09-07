/**
 * 核心webpack配置
 */
const path = require('path');


// 导出webpack基本配置
module.exports = {
    entry: path.join(__dirname, './../src', 'entry.js'), // 入口文件

    // 输出配置
    output: {
        filename: 'bundle.js',                 // 打包的文件名
        path: path.join(__dirname, './../static') // 输出目录
    }
};

