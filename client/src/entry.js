/**
 * 客户端应用入口文件
 */


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







if (module.hot) {
    module.hot.accept();
};