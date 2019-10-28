"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var superagent = require('superagent'); //发起请求 
var cheerio = require('cheerio'); //可以像jquer一样操作界面
var charset = require('superagent-charset'); //解决乱码问题:
charset(superagent);
var async = require('async'); //异步抓取
var eventproxy = require('eventproxy'); //流程控制
var ep = eventproxy();
let baseUrl = "https://www.zhipin.com/c101010100/?query=%E5%89%8D%E7%AB%AF&page=1&ka=page-1";
/**
 * @export
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function jobReptile() {
    return __awaiter(this, void 0, void 0, function* () {
        superagent.get(baseUrl)
            .charset('gb2312')
            .end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                console.log('抓取' + baseUrl + '这条信息的时候出错了');
            }
            var $ = cheerio.load(sres && sres.text);
            var nextUrl = $('.page a').attr('href'); //下一页Url
            var linkElem = $('.job-box .job-list ul li'); //当前UrlLits
            console.log(linkElem.length);
        });
    });
}
exports.jobReptile = jobReptile;
//# sourceMappingURL=jobReptile.js.map