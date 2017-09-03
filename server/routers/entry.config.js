/**
 * Created by 喵鱼 on 2017/8/21.
 */
const fs = require('fs');
const path = require('path');
const router = require('koa-router');
const basicRouter = new router();



// const ioredis = require('ioredis');
// const redis = new ioredis({
//     port: 6379,
//     host: '127.0.0.1',
//     keyPrefix: '前缀:', // 储存redis的key前缀
//     retryStrategy: function (times) { // 不是手动断开链接将在指定时间内重新链接
//         var delay = Math.min(times * 50, 2000);
//         return delay;
//     },
//     reconnectOnError: function (err) { // 自动链接失败
//         var targetError = 'READONLY';
//         if (err.message.slice(0, targetError.length) === targetError) {
//             // Only reconnect when the error starts with "READONLY"
//             return true; // or `return 1;`
//         }
//     }
// });


// redis.on('connect', function() {
//     console.log('链接成功')
// })
// redis.on('ready', function() {
//     console.log('redis准备完毕')
// })
// redis.on('error', function() {
//     console.log('redis出错了')
// })
// redis.on('close', function() {
//     console.log('redis被关闭了')
// })
// redis.on('reconnecting', function() {
//     console.log('正在重新连接中')
// })
// redis.on('end', function() {
//     console.log('没有建立链接')
// })

// 断开 / 退出链接
// redis.disconnect()
// redis.quit()



// 时钟监听redis
// redis.monitor(function (err, monitor) {
//     monitor.on('monitor', function (time, args, source, database) {
//         console.log(time)
//     });
// });


// 配置核心路由
basicRouter.get('*', async (ctx) => {

    // await redis.mset({
    //     name: 'yu',
    //     age: 111
    // });
    // await redis.get(['name', 'age']).then(function(data) {
    //     console.log(data)
    // });


    ctx.session = {
        aa: '11',
        bb: '22'
    }


    console.log(111)

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

