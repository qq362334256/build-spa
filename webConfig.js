/**
 * 应用配置文件
 */
module.exports = {
    // 应用服务配置
    server: {
        host: '127.0.0.1',                 // 访问地址
        port: 3001,                        // 端口号
        fileCacheTime: 9999999999999999,   // 文件缓存时间
        requestLimit: '10mb'               // 服务接受请求的最大体积
    },

    // redis缓存数据库配置
    redis: {
        host: '127.0.0.1',  // 访问地址
        port: 6379,         // 端口号
    }
};