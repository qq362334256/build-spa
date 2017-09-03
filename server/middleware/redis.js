const Redis = require("ioredis");
const { Store } = require("koa-session2");

class RedisStore extends Store {
    constructor() {
        super();
        this.redis = new Redis({
            port: 6379,
            host: '127.0.0.1',
            keyPrefix: 'MIAOYU:', // 储存redis的key前缀

        });
    }

    async get(sid) {
        let data = await this.redis.get(sid);
        return JSON.parse(data);
    }
    //
    async set(session, { sid =  this.getID(24), maxAge = 1000000 } = {}) {


        try {
            await this.redis.set(sid, JSON.stringify(session), 'EX', maxAge / 1000);
        } catch (e) {}
        return sid;
    }

    async destroy(sid) {
        return await this.redis.del(sid);
    }
}

module.exports = RedisStore;