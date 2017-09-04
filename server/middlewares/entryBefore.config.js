/**
 * 路由前中间件配置文件
 */
const path = require('path');
const convert = require('koa-convert'); // 低版本中间件的过渡兼容插件
const {
    server: {
        fileCacheTime: serverFileCacheTime,
        requestLimit: serverRequsetLimit
    }
} = require('./../../webConfig');


module.exports = [
    // koa-logger中间件
    require('koa-logger')(),

    // 自己封装打印请求时间和其他信息的中间件
    require('./logger.js')(),

    // 请求体处理中间件
    require('koa-bodyparser')({
        formLimit: serverRequsetLimit, // 请求表单的最大体积
        jsonLimit: serverRequsetLimit, // 请求json的最大体积
        textLimit: serverRequsetLimit  // 请求文本的最大体积
    }),

    // 静态资源中间件
    require('koa-static')(path.join(__dirname, './../../client/static'), {
        maxage: serverFileCacheTime // 文件缓存时间
    })
];
