/**
 * Created by 喵鱼 on 2017/8/14.
 */
module.exports = function () {
    return async function(ctx, next) {
        console.log(ctx.headers)

        next();
    };
};