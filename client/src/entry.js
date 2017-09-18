/**
 * 客户端应用入口文件
 */







// 测试环境才开启hot热替换
if (process.env.NODE_ENV === 'development' && module.hot) module.hot.accept();


// 异步加载示例
// const getAsync = async () => {
//
//     const getFn =  await require.ensure('./async.js', () => {
//         console.log('异步脚本执行了121！')
//     }, 'async');
// };
//
//
// setTimeout(function() {
//     getAsync();
// }, 3000)