/**
 * 应用配置文件
 */
module.exports = {
    env: 'development', // 生产环境production | development测试环境
    projectId: 'MIAOYU', // 项目ID
    sessionMaxAge: 7200000, // session过期时间

    // 应用服务配置
    server: {
        host: '127.0.0.1',                 // 访问地址
        port: 3001,                        // 端口号
        fileCacheTime: 9999999999999999,   // 文件缓存时间
        requestLimit: '10mb'               // 服务接受请求的最大体积
    },

    // redis缓存数据库配置
    redis: {
        host: '127.0.0.1',       // 访问地址
        port: 6379,              // 端口号
        retryStrategyTime: 2000, // 非主动断开redis连接的重连时间
    },

    // 客户端构建
    clientBuild: {
        autoOpenBrowser: true,             // 是否自动打开游览器
        libList: ['react', 'react-dom'],    // 独立抽出打包的lib列表
        assetsUrl: 'http://127.0.0.1:3001/' // 打包资源的引入域
    }
};