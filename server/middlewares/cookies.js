module.exports = () => async (
    ctx, next
) => {

    // 设置cookie
    ctx.cookies.set('session_id', '1111', {
        domain: '127.0.0.1', // 网站域名
        path: '/index', // cookie所在路径
        maxAge: 10 * 60 * 1000, // cookie有效时长(毫秒)
        expires: new Date('2017-02-15'),  // cookie失效时间
        secure: false, // 是否为https安全链接
        httpOnly: false, // 是否只用于http请求中获取
        overwrite: false // 是否允许重写
    });

    await next();
};