/**
 * 应用服务启动文件
 */

const koa = require('koa');
const app = new koa();
const basicRouter = require('./server/routers/entry.config.js'); // 路由配置
const {
    server: {
        host: serverHost,
        port: serverPort
    }
} = require('./webConfig');


// request前数据中间件
app.use(...require('./server/middlewares/entryBefore.config.js'));

// 装载路由
app.use(basicRouter.routes()).use(basicRouter.allowedMethods());



// const session = require("koa-session2");
// const Store = require("./server/middlewares/redis.js");
//
// app.use(session({
//     store: new Store()
// }));


// 启动服务，并输出日期
app.listen(serverPort, serverHost, async () => {
    console.log(`web服务启动成功！地址：${serverHost}:${serverPort}`);
});

