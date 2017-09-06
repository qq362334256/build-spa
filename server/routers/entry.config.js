/**
 * Created by 喵鱼 on 2017/8/21.
 */
const fs = require('fs');
const path = require('path');
const router = require('koa-router');
const basicRouter = new router();



// 配置核心路由
basicRouter.get('*', async (ctx) => {


    ctx.session = {
        aa: '11',
        bb: '22'
    }

    console.log(ctx.session)
    ctx.body = '2222'



    // console.log(ctx.cookies.get('session_id'));

    // // 读取HTML静态文件
    // const html = await (new Promise(
    //     (resolve, reject) => fs.readFile(
    //         path.resolve(__dirname, './../../client/static/index.html'), (err, data) => {
    //             if (err){
    //                 reject(err);
    //             } else {
    //                 resolve(data);
    //             };
    //         }
    //     )
    // ));
    //
    // // 设置文件type / body
    // ctx.type = 'html';
    // ctx.body = html;
});


// 导出核心路由
module.exports = basicRouter;

