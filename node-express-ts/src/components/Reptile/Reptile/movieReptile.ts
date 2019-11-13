import MovieService from './../../Movie/service';
import MovieModel, { IMovieModel } from './../../Movie/model';
import { concat } from 'rxjs';
import { string, any } from 'joi';
import { Types } from 'mongoose';


const superagent: any = require('superagent'); // 发起请求 
const cheerio: any = require('cheerio'); // 可以像jquery一样操作界面
const charset: any = require('superagent-charset'); // 解决乱码问题:
const async: any = require('async'); // 异步抓取
const eventproxy: any = require('eventproxy');  // 流程控制
const ep: any = eventproxy();
const baseUrl: string = 'http://www.dytt8.net';  // 迅雷首页链接
const errLength: any = [];      // 统计出错的链接数





charset(superagent);
superagent.buffer['mime'] = false;

/**
 * @export
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Promise < void >}
 */

export async function movieReptile(): Promise<void> {

    const getMovieListFun: any = new getMovieList;

    const dyDLeiUrl: string[] = [
        'https://www.dytt8.net/html/gndy/dyzz/index.html',
        'https://www.dytt8.net/html/gndy/oumei/index.html',
        'https://www.dytt8.net/html/gndy/china/index.html',
        'https://www.dytt8.net/html/gndy/rihan/index.html',
    ];
    let i: number = 0;

    for (i < dyDLeiUrl.length; i++;) {
        setTimeout(() => {
            getMovieListFun.index(dyDLeiUrl[i]);
        }, i * 1000);
    }

    setTimeout(() => {
        getMovieListFun.goGetMovieList();
    }, (i + 2) * 1000);
}

class getMovieList {
    baseUrl: string = 'https://www.dytt8.net/html/gndy/dyzz/index.html';
    errLength: string[] = [];
    urlList: string[] = [];

    async index(url: string): Promise<void> {
        if (url) {
            this.baseUrl = url;
        }
        console.log('抓取专题：' + this.baseUrl);
        superagent
            .get(this.baseUrl)
            .charset('gb2312')
            .end((err: any, sres: any) => {
                // 常规的错误处理
                if (err) {
                    console.log('抓取' + this.baseUrl + '这条信息的时候出错了', err);
                }
                const $: any = cheerio.load(sres && sres.text);
                const elemPageList: any = $('.bd3r .co_content8 .x');

                const allPages1: string = elemPageList[0].firstChild.data;
                const allPages: string = allPages1.split('共')[1].split('页')[0];
                const baseHref: string = url.split('index.html')[0];
                const topicHref: string = $('.bd3r .co_content8 .x a').eq(1).attr('href');
                const topicId: string = topicHref.split('_')[1];

                this.getPageListArray($);
                this.getPagesMovieList(Number(allPages), baseHref, topicId);
            });
    }
    getPagesMovieList(allPages: number, baseHref: string, topicId: string): void {
        console.log(allPages, baseHref);
        for (let i: number = 2; i < allPages + 1; i++) {
            this.urlList.push(baseHref + `list_${topicId}_${i}.html`);
        }
    }

    goGetMovieList(): void {
        console.log('需要抓取的页面数量为：' + this.urlList.length)
        for (let i: number = 0; i < this.urlList.length; i++) {
            setTimeout(() => {
                this.getPageList(this.urlList[i]);
            }, i * Math.ceil(Math.random() * 10) * 500);
        }
    }

    async getPageList(url: string): Promise<void> {
        superagent
            .get(url)
            .charset('gb2312')
            .end((err: any, sres: any) => {
                // 常规的错误处理
                if (err) {
                    console.log('抓取' + url + '这条信息的时候出错了', err);
                    this.errLength.push(url);
                } else {
                    console.log('抓取：' + url);
                    const $: any = cheerio.load(sres && sres.text);

                    this.getPageListArray($);
                }
            });
    }

    getPageListArray($: any): void {

        const movieArray: any = $('.bd3r .co_content8 ul table');

        for (let i: number = 0; i < movieArray.length; i++) {
            const movieItem: any = {
                name: '',
                updateDate: '',
                clickNum: 0,
                href: '',
                sketch: '',
                years: 0,
            };
            const fonts: string = movieArray[i].lastChild.children[4].children[3].children[1].children[0].data || '';
            if (movieArray[i].lastChild.children[2].children[3].children[1].length < 3) {
                movieItem.name = movieArray[i].lastChild.children[2].children[3].children[1].children[1] &&
                    movieArray[i].lastChild.children[2].children[3].children[1].children[1].children[0].data || '';
                movieItem.href = 'https://www.dytt8.net' + movieArray[i].lastChild.children[2].children[3].children[1].children[1].attribs.href || '';
            } else {
                movieItem.name = movieArray[i].lastChild.children[2].children[3].children[1].children[3] &&
                    movieArray[i].lastChild.children[2].children[3].children[1].children[3].children[0].data || '';
                movieItem.href = movieArray[i].lastChild.children[2].children[3].children[1].children[3] ?
                    'https://www.dytt8.net' + movieArray[i].lastChild.children[2].children[3].children[1].children[3].attribs.href : '';
            }
            movieItem.clickNum = Number(fonts.split('点击：')[1]) || 0;
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
    insetMovieToDB(movieItem: any): void {
        MovieService.insert(movieItem);
    }
}


export async function getMovieDetail(): Promise<void> {

    const getMovieDetailFun: any = new getMovieDetailClass;

    const movieList: any = await MovieService.findAll({ page: 0, pageSize: 100000, Reptile: true });// findAll: true 
    let a = 1;

    for (let i = 0; i < movieList.data.length; i++) {
        if (!(movieList.data[i].details && movieList.data[i].details.detailDes)) {
            a++
            setTimeout(() => {
                getMovieDetailFun.fetchUrl(movieList.data[i]);
            }, a * Math.ceil(Math.random() * 10) * 1000);
        }
    }
    console.log('开始抓取详情需抓取链接数为：' + movieList.data.length);

}

class getMovieDetailClass {
    errurlList: string[] = [];

    fetchUrl(movieOj: any): void {
        superagent
            .get(movieOj.href)
            .charset('gb2312') // 解决编码问题
            .end((err: any, ssres: any) => {
                if (err) {
                    errLength.push(movieOj.href);
                    console.log('抓取失败：' + movieOj.href);
                    console.log(err, ssres);
                } else {
                    const $: any = cheerio.load(ssres && ssres.text);

                    if ($) {
                        this.getDetail($, movieOj);
                    }
                }
            });
    }
    getDetail($: any, movieOj: any): void {
        const updateQurey: any = {
            _id: Types.ObjectId(movieOj.id)
        };
        const newMovieOj: any = JSON.parse(JSON.stringify(movieOj));

        newMovieOj.imgUrl = $('#Zoom p img').attr('src') || '';
        newMovieOj.downLink = $('#Zoom table a').text() || '';
        const detailImg: any = ($('#Zoom p img')[1] && $('#Zoom p img')[1].attribs.src) || '';
        const detailHtmlGet: any = ($('#Zoom p')[0] && $('#Zoom p')[0].children.length) > 1 ? $('#Zoom p')[0] : $('#Zoom span')[0];
        let detailDes: string = '';

        if (detailHtmlGet && detailHtmlGet.children && detailHtmlGet.children.length > 0) {
            for (let i = 0; i < detailHtmlGet.children.length; i++) {
                if (detailHtmlGet.children[i].data) {
                    detailDes = detailDes + detailHtmlGet.children[i].data + 'detailDes';// detailDes 用于分割详情
                }
            }
        }

        newMovieOj.details = {
            detailImg,
            detailDes
        };
        console.log(newMovieOj);
        MovieService.update(updateQurey, newMovieOj);

    }

}




