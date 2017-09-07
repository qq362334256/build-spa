/**
 * 核心webpack配置
 */
const path = require('path');


module.exports = {
    entry: path.join(__dirname, './../src', 'entry.js'), // 入口文件

    // 输出配置
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, './../src', 'entry.js'), // 输出目录
    }
};

