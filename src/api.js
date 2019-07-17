
var api1 = '/api1'; // 短信
var api2 = '/api2'; // 业务
var apiProd1 = 'http://api.iambuyer.com'; // 生产环境使用
var apiProd2 = 'http://api.ruhexiu.com'; // 生产环境使用
var apiProd3 = 'http://img01.iambuyer.com'; // 生产环境使用
process.env.NODE_ENV !== 'production' ? api1 = '/api1' : api1 = '';
process.env.NODE_ENV !== 'production' ? api2 = '/api2' : api2 = '';
export {api1, api2, apiProd1, apiProd2, apiProd3};
