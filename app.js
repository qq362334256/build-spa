/**
 * Created by yanmin.yu on 2017/8/5.
 */
const koa = require('koa');
const app = new koa();
const router = require('koa-router');
const basicRouter = new router();
const { port } = require('./webConfig.json');


// 请求前中间件
// 日志中间件
app.use(require('./middleware/logger.js')());


basicRouter.get('/index', async (ctx) => {
    ctx.body = '1111'
})


// 装载路由 / 响应前中间件
app.use(basicRouter.routes(), basicRouter.allowedMethods());


// 启动服务，并输出日期
app.listen(port, async () => {
    console.log(`web服务启动成功！地址：127.0.0.1:${port}`);
});