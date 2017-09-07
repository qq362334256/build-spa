/**
 * redis服务
 * ----- 方法 -----
 * redis.mset(object) - 同时设置多个键值对
 * redis.get(array) - 同时读取多个键值对
 * redis.set(key, valuer, 'EX', maxAge) - 设置单个键值对
 * redis.get(key) - 读取单个键值对
 * redis.disconnect() - 断开连接
 * redis.quit() - 退出连接
 * ----- 时钟 -----
     redis.monitor(function(err, monitor) {
        monitor.on('monitor', function(time, args, source, database) {
            console.log(time)
        });
     });
 */
const Redis = require("ioredis");
const { logErr } = require('./../public/utils/logger.js');
const {
    projectId,
    redis: {
        host, port, retryStrategyTime
    }
} = require('./../../webConfig.js');


// 初始化redis
const redis = new Redis({
    host,                         // redis地址
    port,                         // 端口号
    keyPrefix: `${projectId}:`, // 储存redis的key前缀

    // 不是手动断开链接将在指定时间内重新链接
    retryStrategy: times => Math.min(times * 50, retryStrategyTime),

    // 自动链接失败
    reconnectOnError(err) {
        let targetError = 'READONLY';

        // 只有重连报 'READONLY' 这个错误的时候才会返回
        if (err.message.slice(0, targetError.length) === targetError) return true;
    }
});


// redis一系列监听
redis.on('connect', () => {
    console.log(`redis连接成功！地址：${host}:${port}`);
});
redis.on('ready', () => {
    console.log('redis准备就绪！');
});
redis.on('error', () => {
    logErr('redis出错了！');
});
redis.on('close', () => {
    console.log('redis被关闭了！');
});
redis.on('reconnecting', () => {
    console.log('redis正在重新连接中!');
})
redis.on('end', () => {
    console.log('redis没有建立链接!');
})


// 返回redis实例
module.exports = redis;