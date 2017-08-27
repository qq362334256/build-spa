/**
 * Created by 喵鱼 on 2017/8/14.
 */
// 日志中间件
module.exports = () => async (
    { request: { method, url } },
    next
) => {
    const currDate = new Date();

    // 输出到控制台
    console.log(`--- ${currDate.getFullYear()}-${currDate.getMonth()}-${currDate.getDate()} ${currDate.getHours()}:${currDate.getMinutes()}:${currDate.getSeconds()} --- 发来 ${method} 请求，地址 --- ${url} ---`);

    await next();
};