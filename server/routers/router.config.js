/**
 * 路由入口配置
 */
const router = require('koa-router');
const basicRouter = new router();


// 配置核心路由
basicRouter.get('*', require('./basic/get.controller.js'));


// 导出核心路由
module.exports = basicRouter;

