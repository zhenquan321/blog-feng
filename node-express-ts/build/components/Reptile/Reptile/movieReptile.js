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
const service_1 = require("./../../movie/service");
const superagent = require('superagent'); // 发起请求 
const cheerio = require('cheerio'); // 可以像jquery一样操作界面
const charset = require('superagent-charset'); // 解决乱码问题:
const async = require('async'); // 异步抓取
const eventproxy = require('eventproxy'); // 流程控制
const ep = eventproxy();
const baseUrl = 'http://www.dytt8.net'; // 迅雷首页链接
const newMovieLinkArr = []; // 存放新电影的url
const errLength = []; // 统计出错的链接数
const highScoreMovieArr = []; // 高评分电影
charset(superagent);
superagent.buffer['mime'] = false;
/**
 * @export
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function movieReptile() {
    return __awaiter(this, void 0, void 0, function* () {
        const get2019moviesFun = new get2019movies;
        get2019moviesFun.index();
    });
}
exports.movieReptile = movieReptile;
// 获取2019最新电影
class get2019movies {
    constructor() {
        this.baseUrl = 'https://www.dytt8.net/html/gndy/dyzz/index.html';
        this.errLength = [];
        this.urlList = [];
    }
    // 评分8分以上影片 200余部!，这里只是统计数据，不再进行抓取
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            superagent
                .get(this.baseUrl)
                .charset('gb2312')
                .end((err, sres) => {
                // 常规的错误处理
                if (err) {
                    console.log('抓取' + this.baseUrl + '这条信息的时候出错了', err);
                }
                const $ = cheerio.load(sres && sres.text);
                const elemPageList = $('.bd3r .co_content8 .x');
                console.log('获取2019最新电影');
                const allPages1 = elemPageList[0].firstChild.data;
                const allPages = allPages1.split('共')[1].split('页')[0];
                const baseHref = $('.bd3r .co_content8 .x a').eq(1).attr('href');
                this.getPageListArray($);
                this.getPagesMovieList(Number(allPages), baseHref);
            });
        });
    }
    getPagesMovieList(allPages, baseHref) {
        console.log(allPages, baseHref);
        for (let i = 2; i < allPages + 1; i++) {
            this.urlList.push(`https://www.dytt8.net/html/gndy/dyzz/list_23_${i}.html`);
            setTimeout(() => {
                this.getPageList(`https://www.dytt8.net/html/gndy/dyzz/list_23_${i}.html`);
            }, i * 1000);
        }
    }
    getPageList(url) {
        return __awaiter(this, void 0, void 0, function* () {
            superagent
                .get(url)
                .charset('gb2312')
                .end((err, sres) => {
                // 常规的错误处理
                if (err) {
                    console.log('抓取' + url + '这条信息的时候出错了', err);
                    this.errLength.push(url);
                }
                else {
                    console.log('抓取：' + url);
                    const $ = cheerio.load(sres && sres.text);
                    this.getPageListArray($);
                }
            });
        });
    }
    getPageListArray($) {
        const movieArray = $('.bd3r .co_content8 ul table');
        for (let i = 0; i < movieArray.length; i++) {
            const movieItem = {
                name: '',
                updateDate: '',
                clickNum: 0,
                href: '',
                sketch: '',
                years: 0,
            };
            const fonts = movieArray[i].lastChild.children[4].children[3].children[1].children[0].data || '';
            movieItem.name = movieArray[i].lastChild.children[2].children[3].children[1].children[1].children[0].data || '';
            movieItem.href = 'https://www.dytt8.net' + movieArray[i].lastChild.children[2].children[3].children[1].children[1].attribs.href || '';
            movieItem.years = Number(movieItem.name.slice(0, 4)) || '';
            movieItem.clickNum = Number(fonts.split('点击：')[1]) || '';
            movieItem.updateDate = fonts.split('点击：')[0].split('日期：')[1] || '';
            movieItem.sketch = (movieArray[i].lastChild.children[6].children[1] && movieArray[i].lastChild.children[6].children[1].lastChild &&
                movieArray[i].lastChild.children[6].children[1].lastChild.data) || '';
            // 获取到单个电影的信息;
            this.insetMovieToDB(movieItem);
        }
    }
    insetMovieToDB(movieItem) {
        service_1.default.insert(movieItem);
    }
}
// 抓取详情
class getMovieDetails {
    insertUrl(eps, type) {
        return __awaiter(this, void 0, void 0, function* () {
            let concurrencyCount = 0;
            let num = -4; // 因为是5个并发，所以需要减4
            let yizhuqu = 0;
            // 利用callback函数将结果返回去，然后在结果中取出整个结果数组。
            function fetchUrl(myurl, callback) {
                const fetchStart = new Date().getTime();
                concurrencyCount++;
                num += 1;
                console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', myurl);
                superagent
                    .get(myurl)
                    .charset('gb2312') // 解决编码问题
                    .end((err, ssres) => {
                    yizhuqu++;
                    if (err) {
                        callback(err, myurl + ' error happened!');
                        errLength.push(myurl);
                    }
                    var time = new Date().getTime() - fetchStart;
                    console.log(yizhuqu + '抓取 ' + myurl + ' 成功', '，耗时' + time + '毫秒');
                    concurrencyCount--;
                    var $ = cheerio.load(ssres && ssres.text);
                    // 对获取的结果进行处理函数
                    this.getDownloadLink($, (obj) => {
                        const movie = {
                            name: obj.name,
                            downLink: obj.downLink,
                            href: myurl,
                            imgUrl: obj.imgUrl,
                            years: Number(obj.name.substring(0, 4)) || 0,
                            type: type,
                        };
                        service_1.default.insert(movie);
                    });
                    const result = {
                        movieLink: myurl
                    };
                    callback(null, result);
                });
            }
            // 控制最大并发数为5，在结果中取出callback返回来的整个结果数组。
            // mapLimit(arr, limit, iterator, [callback])
            async.mapLimit(eps, 5, (myurl, callback) => {
                fetchUrl(myurl, callback);
            }, () => {
                // 爬虫结束后的回调，可以做一些统计结果
                console.log('抓包结束，一共抓取了-->' + eps.length + '条数据');
                console.log('出错-->' + errLength.length + '条数据');
            });
        });
    }
    // 获取下载链接
    getDownloadLink($, callback) {
        let downLink = $('#Zoom table a').text();
        const movieName = $('.title_all h1 font').text();
        const imgUrl = $('#Zoom p img').attr('src');
        if (!downLink) {
            downLink = '该电影暂无链接';
        }
        const obj = {
            downLink: downLink,
            name: movieName,
            imgUrl: imgUrl,
            href: "",
            years: 0
        };
        callback(obj);
    }
}
//# sourceMappingURL=movieReptile.js.map