/**
 * Created by yanmin.yu on 2017/8/5.
 */
const koa = require('koa');
const app = new koa();
const basicRouter = require('./routers/entry.config.js');
const { port } = require('./webConfig.json');


// 请求前中间件
// 日志中间件
app.use(require('./middleware/logger.js')());
// 请求体处理中间件
app.use(require('koa-bodyparser')({
    formLimit: '10mb', // 请求表单的最大体积
    jsonLimit: '10mb', // 请求json的最大体积
    textLimit: '10mb'  // 请求文本的最大体积
}));


// 装载路由 / 响应前中间件
app.use(basicRouter.routes()).use(basicRouter.allowedMethods());


// 启动服务，并输出日期
app.listen(port, async () => {
    console.log(`web服务启动成功！地址：127.0.0.1:${port}`);
});