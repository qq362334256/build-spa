/**
 * 核心控制器
 */
const fs = require('fs');
const path = require('path');


// 导出通用路由控制器
module.exports = async (ctx) => {
    // 读取HTML静态文件
    let html = await (new Promise(
        (resolve, reject) => fs.readFile(
            path.join(__dirname, './../../../client/static/index.html'), (err, data) => {

                if (err){
                    reject(err);
                } else {
                    resolve(data);
                };
            }
        )
    ));

    // 设置文件type / body
    ctx.type = 'html';
    ctx.body = html;
};