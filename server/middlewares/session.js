/**
 * session中间件
 */
const session = require("koa-session2");
const Redis = require("ioredis");
const { logErr } = require('./../public/utils/logger.js');
const {
    redis: {
        host: redisHost,
        port: redisPort,
        projectId
    }
} = require('./../../webConfig.js');


// 构造redis操作类
class RedisStore extends session.Store {
    constructor() {
        super();

        // 初始化redis
        this.redis = new Redis({
            host: redisHost,                       // redis地址
            port: redisPort,                       // 端口号
            keyPrefix: `${projectId}-SESSION_ID:`, // 储存redis的key前缀
        });

        // redis一系列监听
        redis.on('connect', function() {
            console.log('redis连接成功！')
        });
        redis.on('ready', function() {
            console.log('redis准备就绪！')
        });
        redis.on('error', function() {
            logErr('redis出错了！')
        });
        redis.on('close', function() {
            console.log('redis被关闭了！')
        });
    };

    async get(sid) {
        let data = await this.redis.get(sid);
        return JSON.parse(data);
    }
    //
    async set(session, { sid =  this.getID(24), maxAge = 1000000 } = {}) {


        try {
            await this.redis.set(sid, JSON.stringify(session), 'EX', maxAge / 1000);
        } catch (e) {
            logErr('设置redis-session失败！');
        }
        return sid;
    }

    async destroy(sid) {
        return await this.redis.del(sid);
    }
};


// 导出异步session中间件
module.exports = (app) => async (
    ctx,
    next
) => {
    app.use(session({
        store: new RedisStore()
    }));

    await next();
};