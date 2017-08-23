/**
 * Created by yanmin.yu on 2017/8/5.
 */


var darNum = (10000 * 0.086 / 365).toFixed(2);
var benJin = 20000;
var monthLi = 0;
var day = 0;
var monthSize = 0;


while (monthLi < 2500) {
    var dayLi = benJin * 0.086 / 365;


    benJin += dayLi;
    monthLi += dayLi;

    if (++day === 30) {
        monthSize++;
        console.log('月利率-'+ monthLi)
        console.log('本金-'+ benJin)
        console.log('月份-'+ monthSize)


        benJin += 5000 + monthLi;
        monthLi = 0;
        day = 0;
    }
}





// const koa = require('koa');
//
//
// console.log(koa)
// // const app = koa();
// //
// //
// // app.use(function* () {
// //     this.body = '主体';
// // })
// //
// // app.listen(5001);
// var koa = require('koa');
// var app = new koa();
//
// app.use(function *(){
//     this.body = 'Hello World';
// });
//
// app.listen(3000);

