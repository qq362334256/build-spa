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
const webConfig = require('./client/build/webpack.basic.js');
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');
const compile = webpack(webConfig);
app.use(devMiddleware(compile, {
    // display no info to console (only warnings and errors)
    noInfo: false,

    // display nothing to the console
    quiet: false,

    // switch into lazy mode
    // that means no watching, but recompilation on every request
    // lazy: true,

    // watch options (only lazy: false)
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },

    // public path to bind the middleware to
    // use the same as in webpack
    // publicPath: path.join(__dirname, './client/static'),
    publicPath: '/',

    // custom headers
    headers: { "X-Custom-Header": "yes" },

    // options for formating the statistics
    stats: {
        colors: true
    }
}))
app.use(hotMiddleware(compile, {
    // log: console.log,
    // path: '/__webpack_hmr',
    // heartbeat: 10 * 1000
}))




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