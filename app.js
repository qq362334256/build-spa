/**
 * 应用服务启动文件
 */
const path = require('path');
const convert = require('koa-convert'); // 低版本中间件的过渡兼容插件
const Koa = require('koa');
const app = new Koa();
const basicRouter = require('./server/routers/router.config.js'); // 路由配置
const {
    server: {
        host: serverHost,
        port: serverPort,
        fileCacheTime: serverFileCacheTime,
        requestLimit: serverRequsetLimit
    }
} = require('./webConfig.js');


// webpack中间件
const webpack = require('webpack');
const webConfig = require('./client/build/webpack.dev.js');
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');
const compile = webpack(webConfig);
app.use(devMiddleware(compile, {
    noInfo: true,    // 不显示其他不用信息
    quiet: false,    // 任何信息不会显示在控制台，默认为false
    publicPath: '/', // 打包资源的访问路径

    // 文件监听设置
    watchOptions: {
        aggregateTimeout: 300,   // 当第一个文件更改，会在重新构建前增加延迟。这个选项允许 webpack 将这段时间内进行的任何其他更改都聚合到一次重新构建里。以毫秒为单位
        poll: true,             // 是否启用讯轮
        ignored: /node_modules/ // 排除需要监听的目录
    },

    // 请求体的头部设置
    headers: { 
        'X-Custom-Header': 'yes' // 允许兼容ie8
    }, 

    // 需要显示的信息配置
    stats: {
        colors: true
    },

    open: true
}));
app.use(hotMiddleware(compile));




// 连接redis缓存服务
const redis = require('./server/services/redis.js');


// request接收前中间件
// koa-logger中间件
app.use(require('koa-logger')());

// 自己封装打印请求时间和其他信息的中间件
app.use(require('./server/middlewares/logger.js')());

// 请求体处理中间件
app.use(require('koa-bodyparser')({
    formLimit: serverRequsetLimit, // 请求表单的最大体积
    jsonLimit: serverRequsetLimit, // 请求json的最大体积
    textLimit: serverRequsetLimit  // 请求文本的最大体积
}));

// 静态资源中间件
app.use(require('koa-static')(path.join(__dirname, './client/static'), {
    maxage: serverFileCacheTime // 文件缓存时间
}));

// session中间件
app.use(require('./server/middlewares/session.js'));

// 装载自定义路由 / 路由错误处理
app.use(basicRouter.routes()).use(basicRouter.allowedMethods());


// 启动服务，并输出日期
app.listen(serverPort, serverHost, () => {
    console.log(`web服务启动成功！地址：${serverHost}:${serverPort}`);
});