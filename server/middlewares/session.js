/**
 * session中间件
 */
const session = require("koa-session2");
const redis = require('./../services/redis.js');


// 构造redis操作类
class RedisStore extends session.Store {
    // 构造方法
    constructor() {
        super();

        this.redis = redis;
    };

    // 获取sessionId
    async get(sessionId) {
        let data = await this.redis.get(`SESSIONID:${sessionId}`);

        return JSON.parse(data);
    }

    async set(session, { sid =  this.getID(24), maxAge = 1000000 } = {}) {


        try {
            await this.redis.set(`SESSIONID:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000);
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
module.exports = RedisStore;