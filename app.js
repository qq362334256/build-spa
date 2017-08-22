/**
 * Created by yanmin.yu on 2017/8/5.
 */
const path = require('path');
const koa = require('koa');
const app = new koa();
const basicRouter = require('./server/routers/entry.config.js');
const { host, port, fileCacheTime, queryLimit } = require('./webConfig.json');


// 请求前中间件
// 日志中间件
app.use(require('./server/middleware/logger.js')());
app.use(require('koa-logger')());

// 静态资源中间件
app.use(require('koa-static')(path.join(__dirname, './client/static'), {
    maxage: fileCacheTime // 文件缓存时间
}));

// 请求体处理中间件
app.use(require('koa-bodyparser')({
    formLimit: queryLimit, // 请求表单的最大体积
    jsonLimit: queryLimit, // 请求json的最大体积
    textLimit: queryLimit  // 请求文本的最大体积
}));


// 装载路由 / 响应前中间件
app.use(basicRouter.routes()).use(basicRouter.allowedMethods());


// 启动服务，并输出日期
app.listen(port, host, async () => {
    console.log(`web服务启动成功！地址：${host}:${port}`);
});