/**
 * 应用服务启动文件
 */
const path = require('path');
const convert = require('koa-convert'); // 低版本中间件的过渡兼容插件
const koa = require('koa');
const app = new koa();
const basicRouter = require('./server/routers/entry.config.js'); // 路由配置
const {
    server: {
        host: serverHost,
        port: serverPort,
        fileCacheTime: serverFileCacheTime,
        requestLimit: serverRequsetLimit
    }
} = require('./webConfig.js');


// request接收前中间件
// koa-logger中间件
app.use(require('koa-logger')());

// 自己封装打印请求时间和其他信息的中间件
app.use(require('./server/middlewares/logger.js')());

// 请求体处理中间件
app.use(require('koa-bodyparser')({
    formLimit: serverRequsetLimit, // 请求表单的最大体积
    jsonLimit: serverRequsetLimit, // 请求json的最大体积
    textLimit: serverRequsetLimit  // 请求文本的最大体积
}));

// 静态资源中间件
app.use(require('koa-static')(path.join(__dirname, './client/static'), {
    maxage: serverFileCacheTime // 文件缓存时间
}));

// session中间件
app.use(require('./server/middlewares/session.js')(app));

// 装载自定义路由 / 路由错误处理
app.use(basicRouter.routes()).use(basicRouter.allowedMethods());


// 启动服务，并输出日期
app.listen(serverPort, serverHost, async () => {
    console.log(`web服务启动成功！地址：${serverHost}:${serverPort}`);
});

