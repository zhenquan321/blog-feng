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
const service_1 = require("./../../Movie/service");
const superagent = require('superagent'); // 发起请求 
const cheerio = require('cheerio'); // 可以像jquery一样操作界面
const charset = require('superagent-charset'); // 解决乱码问题:
const async = require('async'); // 异步抓取
const eventproxy = require('eventproxy'); // 流程控制
const ep = eventproxy();
const baseUrl = 'http://www.dytt8.net'; // 迅雷首页链接
const errLength = []; // 统计出错的链接数
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
        const getMovieListFun = new getMovieList;
        const dyDLeiUrl = [
            'https://www.dytt8.net/html/gndy/dyzz/index.html',
            'https://www.dytt8.net/html/gndy/oumei/index.html',
            'https://www.dytt8.net/html/gndy/china/index.html',
            'https://www.dytt8.net/html/gndy/rihan/index.html',
            'https://www.dytt8.net/html/gndy/jddy/index.html',
        ];
        for (let i = 0; i < dyDLeiUrl.length; i++) {
            setTimeout(() => {
                getMovieListFun.index(dyDLeiUrl[i]);
            }, i * Math.ceil(Math.random() * 10) * 500);
        }
        setTimeout(() => {
            getMovieListFun.goGetMovieList();
        }, 20000);
    });
}
exports.movieReptile = movieReptile;
class getMovieList {
    constructor() {
        this.baseUrl = 'https://www.dytt8.net/html/gndy/dyzz/index.html';
        this.errLength = [];
        this.urlList = [];
    }
    index(url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (url) {
                this.baseUrl = url;
            }
            console.log('开始抓取专题：' + this.baseUrl);
            superagent
                .get(this.baseUrl)
                .charset('gb2312')
                .end((err, sres) => {
                console.log('已抓取专题：' + this.baseUrl);
                // 常规的错误处理
                if (err) {
                    console.log('抓取' + this.baseUrl + '这条信息的时候出错了', err);
                }
                const $ = cheerio.load(sres && sres.text);
                const elemPageList = $('.bd3r .co_content8 .x');
                const allPages1 = elemPageList[0].firstChild.data;
                const allPages = allPages1.split('共')[1].split('页')[0];
                const baseHref = url.split('index.html')[0];
                const topicHref = $('.bd3r .co_content8 .x a').eq(1).attr('href');
                const topicId = topicHref.split('_')[1];
                this.getPageListArray($);
                this.getPagesMovieList(Number(allPages), baseHref, topicId);
            });
        });
    }
    getPagesMovieList(allPages, baseHref, topicId) {
        console.log(allPages, baseHref);
        //后面更新只更前5页
        allPages = 5;
        for (let i = 2; i < allPages + 1; i++) {
            this.urlList.push(baseHref + `list_${topicId}_${i}.html`);
        }
    }
    goGetMovieList() {
        console.log('需要抓取的页面数量为：' + this.urlList.length);
        for (let i = 0; i < this.urlList.length; i++) {
            setTimeout(() => {
                this.getPageList(this.urlList[i]);
            }, i * Math.ceil(Math.random() * 10) * 500);
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
                href: '',
                sketch: '',
                years: 0,
            };
            const fonts = movieArray[i].lastChild.children[4].children[3].children[1].children[0].data || '';
            if (movieArray[i].lastChild.children[2].children[3].children[1].length < 3) {
                movieItem.name = movieArray[i].lastChild.children[2].children[3].children[1].children[1] &&
                    movieArray[i].lastChild.children[2].children[3].children[1].children[1].children[0].data || '';
                movieItem.href = 'https://www.dytt8.net' + movieArray[i].lastChild.children[2].children[3].children[1].children[1].attribs.href || '';
            }
            else {
                movieItem.name = movieArray[i].lastChild.children[2].children[3].children[1].children[3] &&
                    movieArray[i].lastChild.children[2].children[3].children[1].children[3].children[0].data || '';
                movieItem.href = movieArray[i].lastChild.children[2].children[3].children[1].children[3] ?
                    'https://www.dytt8.net' + movieArray[i].lastChild.children[2].children[3].children[1].children[3].attribs.href : '';
            }
            movieItem.updateDate = fonts.split('点击：')[0].split('日期：')[1] || '';
            movieItem.sketch = (movieArray[i].lastChild.children[6].children[1] && movieArray[i].lastChild.children[6].children[1].lastChild &&
                movieArray[i].lastChild.children[6].children[1].lastChild.data) || '';
            movieItem.years = movieItem.sketch.split('◎年 代')[1] ? Number(movieItem.sketch.split('◎年 代')[1].slice(0, 5)) :
                (Number(movieItem.name.slice(0, 4)) || '');
            // 获取到单个电影的信息;
            if (movieItem.name) {
                this.insetMovieToDB(movieItem);
            }
        }
    }
    insetMovieToDB(movieItem) {
        service_1.default.insert(movieItem);
    }
}
function getMovieDetail() {
    return __awaiter(this, void 0, void 0, function* () {
        const getMovieDetailFun = new getMovieDetailClass;
        const movieList = yield service_1.default.findAll({ page: 0, pageSize: 100000, Reptile: true, findAll: true }); // findAll: true 
        let a = 1;
        for (let i = 0; i < movieList.data.length; i++) {
            if (!(movieList.data[i].details && movieList.data[i].details.detailDes && movieList.data[i].details.detailDes != "暂无详情~")) {
                a++;
                setTimeout(() => {
                    getMovieDetailFun.fetchUrl(movieList.data[i]);
                }, a * Math.ceil(Math.random() * 10) * 1000);
            }
        }
        console.log('开始抓取详情需抓取链接数为：' + movieList.data.length);
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
            .charset('gb2312') // 解决编码问题
            .end((err, ssres) => {
            if (err) {
                errLength.push(movieOj.href);
                console.log('抓取失败：' + movieOj.href);
                console.log(err, ssres);
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
        const newMovieOj = JSON.parse(JSON.stringify(movieOj));
        const detailImg = ($('#Zoom p img')[1] && $('#Zoom p img')[1].attribs.src) || '';
        const detailHtmlGet = ($('#Zoom p')[0] && $('#Zoom p')[0].children.length) > 1 ? $('#Zoom p')[0] :
            ($('#Zoom span')[0] && $('#Zoom span')[0].children.length > 3) ? $('#Zoom span')[0] : $('#Zoom span p')[0];
        let detailDes = '';
        newMovieOj.imgUrl = $('#Zoom p img').attr('src') || '';
        newMovieOj.downLink = $('#Zoom table a').text() || '';
        if (detailHtmlGet && detailHtmlGet.children && detailHtmlGet.children.length > 0) {
            for (let i = 0; i < detailHtmlGet.children.length; i++) {
                if (detailHtmlGet.children[i].data) {
                    detailDes = detailDes + detailHtmlGet.children[i].data + 'detailDes'; // detailDes 用于分割详情
                }
            }
        }
        newMovieOj.details = {
            detailImg,
            detailDes
        };
        console.log(newMovieOj);
        service_1.default.update(movieOj.id, { $set: newMovieOj });
    }
}
//# sourceMappingURL=movieReptile.js.map