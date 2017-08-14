/**
 * Created by yanmin.yu on 2017/8/5.
 */
const koa = require('koa');
const app = new koa();
const logger = require('./middleware/logger.js');


app.use(logger());
app.use(async (ctx) => {
    ctx.body = '11'
})

app.listen(3001);