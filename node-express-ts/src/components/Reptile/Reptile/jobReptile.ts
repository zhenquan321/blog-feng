import JobService from './../../job/service';
import JobModel, { IJobModel } from './../../job/model';
var superagent = require('superagent'); //发起请求 
var cheerio = require('cheerio'); //可以像jquer一样操作界面
var charset = require('superagent-charset'); //解决乱码问题:
charset(superagent);
var async = require('async'); //异步抓取
var eventproxy = require('eventproxy');  //流程控制
var ep = eventproxy();
let baseUrl: string = "https://www.zhipin.com/c101010100/?query=%E5%89%8D%E7%AB%AF&page=1&ka=page-1";


/**
 * @export
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Promise < void >}
 */
export async function jobReptile(): Promise<void> {
    superagent.get(baseUrl)
        .charset('gb2312')
        .end(function (err: any, sres: any) {

            // 常规的错误处理
            if (err) {
                console.log('抓取' + baseUrl + '这条信息的时候出错了')
            }
            var $ = cheerio.load(sres && sres.text);
            var nextUrl = $('.page a').attr('href');//下一页Url
            var linkElem: any = $('.job-box .job-list ul li');//当前UrlLits
            console.log(linkElem.length);
        });
}
