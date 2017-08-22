/**
 * Created by 喵鱼 on 2017/8/21.
 */
const router = require('koa-router');
const basicRouter = new router();


// 配置核心路由
basicRouter.get('/index', async (ctx) => {
    ctx.body = 'index';
});

basicRouter.post('/index', async (ctx) => {
    ctx.body = ctx.request.body;
});

basicRouter.get('/about', async (ctx) => {
    ctx.body = 'about';
});


// 导出核心路由
module.exports = basicRouter;

