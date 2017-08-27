/**
 * Created by yanmin.yu on 2017/8/5.
 */
const path = require('path');
const koa = require('koa');
const app = new koa();
const convert = require('koa-convert'); // 低版本中间件的过渡兼容插件
const basicRouter = require('./server/routers/entry.config.js'); // 路由配置
const {
    server: {
        host: serverHost,
        port: serverPort,
        fileCacheTime: serverFileCacheTime,
        requestLimit: serverRequsetLimit
    },
    redis: {
        host: redisHost,
        port: redisPort,
        ttl: redisTtl
    }
} = require('./webConfig.json');


// 请求前中间件
// 日志中间件
app.use(require('koa-logger')());
app.use(require('./server/middleware/logger.js')());

// 静态资源中间件
app.use(require('koa-static')(path.join(__dirname, './client/static'), {
    maxage: serverFileCacheTime // 文件缓存时间
}));

// 请求体处理中间件
app.use(require('koa-bodyparser')({
    formLimit: serverRequsetLimit, // 请求表单的最大体积
    jsonLimit: serverRequsetLimit, // 请求json的最大体积
    textLimit: serverRequsetLimit  // 请求文本的最大体积
}));

// // session中间件
// app.use(convert(require('koa-session-redis')({
//     key: 'session_id',
//     cookie: {
//         path: '/',
//         httpOnly: true,
//         maxAge: 24 * 60 * 60 * 1000, //one day in ms,
//         rewrite: true,
//         signed: true
//     },
//     store: {
//         host: redisHost, // redis的地址
//         port: redisPort, // redis的端口号
//     }
// })));


// 装载路由 / 响应前中间件
app.use(basicRouter.routes()).use(basicRouter.allowedMethods());


// 启动服务，并输出日期
app.listen(serverPort, serverHost, async () => {
    console.log(`web服务启动成功！地址：${serverHost}:${serverPort}`);
});

