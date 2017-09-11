/**
 * 客户端应用入口文件
 */
import './index.css';
import './test.less';
import { logA } from './module.js';
const getAsync = async () => {

    const getFn =  await import('./async.js');
}


setTimeout(function() {
    getAsync();
}, 3000)



console.log(33333);


console.log(333333)


if (module.hot) {
    module.hot.accept();
};