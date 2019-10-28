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
const service_1 = require("./../service");
const superagent = require('superagent'); // 发起请求 
const cheerio = require('cheerio'); // 可以像jquer一样操作界面
const charset = require('superagent-charset'); // 解决乱码问题:
const async = require('async'); // 异步抓取
const eventproxy = require('eventproxy'); // 流程控制
const ep = eventproxy();
const baseUrl = 'http://www.dytt8.net'; // 迅雷首页链接
const newMovieLinkArr = []; // 存放新电影的url
const errLength = []; // 统计出错的链接数
const highScoreMovieArr = []; // 高评分电影
charset(superagent);
/**
 * @export
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function movieReptile() {
    return __awaiter(this, void 0, void 0, function* () {
        superagent.get(baseUrl)
            .charset('gb2312')
            .end((err, sres) => {
            // 常规的错误处理
            if (err) {
                console.log('抓取' + baseUrl + '这条信息的时候出错了');
            }
            const $ = cheerio.load(sres && sres.text);
            // 170条电影链接，注意去重
            getAllMovieLink($, 'highScoreMovie');
            const linkElem = $('.co_content2 ul a');
            ep.once('highScoreMovie', () => {
                highScoreMovie(linkElem.eq(1).attr('href'));
            });
        });
    });
}
exports.movieReptile = movieReptile;
// 获取首页中左侧栏的所有链接
function getAllMovieLink($, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const linkElem = $('.co_content2 ul a');
        for (let i = 2; i < 170; i++) {
            if (linkElem.eq(i).attr('href')) {
                const url = 'http://www.dytt8.net' + linkElem.eq(i).attr('href');
                // 注意去重
                if (newMovieLinkArr.indexOf(url) == -1) {
                    newMovieLinkArr.push(url);
                }
            }
        }
        insertUrl(newMovieLinkArr, '最新', next);
    });
}
// 评分8分以上影片 200余部!，这里只是统计数据，不再进行抓取
function highScoreMovie(url, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!url) {
            return;
        }
        const useUrl = 'http://www.dytt8.net' + url;
        superagent
            .get(useUrl)
            .charset('gb2312')
            .end((err, sres) => {
            // 常规的错误处理
            if (err) {
                console.log('抓取' + url + '这条信息的时候出错了', err);
            }
            const $ = cheerio.load(sres && sres.text);
            const elemP = $('#Zoom p');
            const elemAany = $('#Zoom a');
            for (let k = 1; k < elemP.length; k++) {
                const Hurl = elemP.eq(k).find('a').text();
                if (highScoreMovieArr.indexOf(Hurl) === -1) {
                    highScoreMovieArr.push(Hurl);
                }
            }
            insertUrl(highScoreMovieArr, '高分', next);
        });
    });
}
// 抓取详情
function insertUrl(eps, type, next) {
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
                getDownloadLink($, (obj) => {
                    const movie = {
                        name: obj.name,
                        downLink: obj.downLink,
                        href: myurl,
                        imgUrl: obj.imgUrl,
                        years: Number(obj.name.substring(0, 4)) || 0,
                        type: type
                    };
                    service_1.MovieReptileService.insert(movie);
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
            if (next) {
                setTimeout(() => {
                    console.log(next + '_____________________');
                    ep.emit(next);
                }, 1000);
            }
        });
    });
}
// 获取下载链接
function getDownloadLink($, callback) {
    let downLink = $('#Zoom table a').text();
    const movieName = $('.title_all h1 font').text();
    const imgUrl = $('#Zoom p img').attr("src");
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
//# sourceMappingURL=movieReptile.js.map