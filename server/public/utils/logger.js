/*
 * 日志工具类
 */
class Logger {
    constructor() {

    };

    // 输出错误日志
    logErr(msg = '没有错误信息！') {

        console.error(msg);
    };
};


module.exports = new Logger();