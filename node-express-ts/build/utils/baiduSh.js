"use strict";
/*
 * 百度内容审核
 * npm install baidu-aip-sdk --save--dev
 */
Object.defineProperty(exports, "__esModule", { value: true });
const AipContentCensorClient = require('baidu-aip-sdk').contentCensor;
// 设置APPID/AK/SK
const APP_ID = '17750270';
const API_KEY = 'ZXjewcGeAwu1GElXYPNmmCem';
const SECRET_KEY = 'N5lMCUiYsgDGXPM6bzw1hBEGpUAHnuC1';
// 新建一个对象，建议只保存一个对象调用服务接口
const client = new AipContentCensorClient(APP_ID, API_KEY, SECRET_KEY);
exports.default = client;
// var HttpClient = require('baidu-aip-sdk').HttpClient;
// // 设置request库的一些参数，例如代理服务地址，超时时间等
// // request参数请参考 https://github.com/request/request#requestoptions-callback
// HttpClient.setRequestOptions({ timeout: 5000 });
// // 也可以设置拦截每次请求（设置拦截后，调用的setRequestOptions设置的参数将不生效）,
// // 可以按需修改request参数（无论是否修改，必须返回函数调用参数）
// // request参数请参考 https://github.com/request/request#requestoptions-callback
// HttpClient.setRequestInterceptor(function (requestOptions) {
//     // 查看参数
//     console.log(requestOptions)
//     // 修改参数
//     requestOptions.timeout = 5000;
//     // 返回参数
//     return requestOptions;
// });
// 文本审核案例
// client.textCensorUserDefined('测试文本').then(function (data) {
//     console.log('<textCensorUserDefined>: ' + JSON.stringify(data));
// }, function (e) {
//     console.log(e)
// });
//# sourceMappingURL=baiduSh.js.map