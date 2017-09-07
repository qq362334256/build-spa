/**
 * session中间件
 * ----- 方法 -----
 * ctx.session - 读取/获取
 */
const redis = require('./../services/redis.js');
const session = require('koa-session2');
const { logErr } = require('./../public/utils/logger.js');
const { sessionMaxAge } = require('./../../webConfig.js');


// 构造redis操作类
class RedisStore extends session.Store {
    // 构造方法
    constructor() {
        super();

        this.redis = redis;
    };

    // 获取session
    async get(sessionId) {
        let data = await this.redis.get(`SESSIONID:${sessionId}`);

        return JSON.parse(data);
    };

    // 设置session
    async set(
        sessionVal, 
        { 
            sessionId = this.getID(24), 
            maxAge = sessionMaxAge 
        } = {}
    ) {
        try {
            await this.redis.set(`SESSIONID:${sessionId}`, JSON.stringify(sessionVal), 'EX', maxAge / 1000);
        } catch (e) {
            logErr('设置redis-session失败！');
        };
        
        return sessionId;
    };
    
    // 删除session
    async destroy(sessionId) {
        return await this.redis.del(sessionId);
    };
};


// 导出异步session中间件
module.exports = session({
    key: 'sessionId',
    store: new RedisStore()
});