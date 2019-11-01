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
const mongoose_1 = require("mongoose");
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
function getMovieDetail() {
    return __awaiter(this, void 0, void 0, function* () {
        const getMovieDetailFun = new getMovieDetailClass;
        const movieList = yield service_1.default.findAll({ page: 0, pagesize: 10000 });
        let a = 1;
        for (let i = 0; i < movieList.data.length; i++) {
            if (!(movieList.data[i].details && movieList.data[i].details.detailDes)) { //&& movieList.data[i].details.detailDes
                a++;
                setTimeout(() => {
                    getMovieDetailFun.fetchUrl(movieList.data[i]);
                }, a * Math.ceil(Math.random() * 10) * 500);
            }
        }
        console.log('开始抓取详情');
    });
}
exports.getMovieDetail = getMovieDetail;
class getMovieDetailClass {
    constructor() {
        this.errurlList = [];
    }
    fetchUrl(movieOj) {
        superagent
            .get(movieOj.href)
            .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36')
            .charset('gb2312') // 解决编码问题
            .end((err, ssres) => {
            if (err) {
                errLength.push(movieOj.href);
                console.log('抓取失败：' + movieOj.href);
            }
            else {
                const $ = cheerio.load(ssres && ssres.text);
                if ($) {
                    this.getDetail($, movieOj);
                }
            }
        });
    }
    getDetail($, movieOj) {
        const updateQurey = {
            _id: mongoose_1.Types.ObjectId(movieOj.id)
        };
        let newMovieOj = JSON.parse(JSON.stringify(movieOj));
        newMovieOj.imgUrl = $('#Zoom p img').attr('src') || '';
        newMovieOj.downLink = $('#Zoom table a').text() || '';
        const detailImg = ($('#Zoom p img')[1] && $('#Zoom p img')[1].attribs.src) || ''; //.children[1].attr('src') || '';
        const detailHtmlGet = $('#Zoom p')[0] || { children: [] };
        let detailDes = '';
        for (let i = 0; i < detailHtmlGet.children.length; i++) {
            if (detailHtmlGet.children[i].data) {
                detailDes = detailDes + detailHtmlGet.children[i].data + 'detailDes'; // detailDes 用于分割详情
            }
            else {
                detailDes = '暂无详情~';
            }
        }
        newMovieOj.details = {
            detailImg,
            detailDes
        };
        service_1.default.update(updateQurey, newMovieOj);
    }
}
//# sourceMappingURL=movieReptile.js.map