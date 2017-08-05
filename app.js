/**
 * Created by yanmin.yu on 2017/8/5.
 */
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
var koa = require('koa');
var app = new koa();

app.use(function *(){
    this.body = 'Hello World';
});

app.listen(3000);