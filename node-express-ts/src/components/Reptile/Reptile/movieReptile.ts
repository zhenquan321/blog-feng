import MovieService from './../../movie/service';
import MovieModel,{ IMovieModel } from './../../movie/model';
import { concat } from 'rxjs';
import { string, any } from 'joi';


const superagent: any = require('superagent'); // 发起请求 
const cheerio: any = require('cheerio'); // 可以像jquery一样操作界面
const charset: any = require('superagent-charset'); // 解决乱码问题:
const async: any = require('async'); // 异步抓取
const eventproxy: any = require('eventproxy');  // 流程控制
const ep: any = eventproxy();
const baseUrl: string = 'http://www.dytt8.net';  // 迅雷首页链接
const newMovieLinkArr: any = []; // 存放新电影的url
const errLength: any = [];      // 统计出错的链接数
const highScoreMovieArr: any = []; // 高评分电影

charset(superagent);
superagent.buffer['mime'] = false;

/**
 * @export
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Promise < void >}
 */

export async function movieReptile(): Promise<void> {

    const get2019moviesFun: any = new get2019movies;

    get2019moviesFun.index();

}

// 获取2019最新电影
class get2019movies {
    baseUrl: string = 'https://www.dytt8.net/html/gndy/dyzz/index.html';
    errLength: string[] = [];
    urlList: string[] = [];
    
    // 评分8分以上影片 200余部!，这里只是统计数据，不再进行抓取
    async index(): Promise<void> {
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

                console.log('获取2019最新电影');
                const allPages1: string = elemPageList[0].firstChild.data;
                const allPages: string = allPages1.split('共')[1].split('页')[0];
                const baseHref: string = $('.bd3r .co_content8 .x a').eq(1).attr('href');

                this.getPageListArray($);
                this.getPagesMovieList(Number(allPages), baseHref);
            });
    }
    getPagesMovieList(allPages: number, baseHref: string): void {
        console.log(allPages, baseHref);
        for (let i: number = 2; i < allPages + 1; i++) {
            this.urlList.push(`https://www.dytt8.net/html/gndy/dyzz/list_23_${i}.html`);
            setTimeout(() => {
                this.getPageList(`https://www.dytt8.net/html/gndy/dyzz/list_23_${i}.html`);
            }, i * 1000);
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
                }else{
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
    insetMovieToDB(movieItem: any): void {
        MovieService.insert(movieItem);
    }
}


// 抓取详情
class getMovieDetails {
    async insertUrl(eps: any, type: string): Promise<void> {
        let concurrencyCount: number = 0;
        let num: number = -4; // 因为是5个并发，所以需要减4
        let yizhuqu: number = 0;

        // 利用callback函数将结果返回去，然后在结果中取出整个结果数组。
        function fetchUrl(myurl: any, callback: any): void {
            const fetchStart: any = new Date().getTime();
            concurrencyCount++;
            num += 1;
            console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', myurl);
            superagent
                .get(myurl)
                .charset('gb2312') // 解决编码问题
                .end((err: any, ssres: any) => {
                    yizhuqu++
                    if (err) {
                        callback(err, myurl + ' error happened!');
                        errLength.push(myurl);
                    }
                    var time = new Date().getTime() - fetchStart;
                    console.log(yizhuqu + '抓取 ' + myurl + ' 成功', '，耗时' + time + '毫秒');
                    concurrencyCount--;
                    var $ = cheerio.load(ssres && ssres.text);
                    // 对获取的结果进行处理函数
                    this.getDownloadLink($, (obj: IMovieModel) => {
                        const movie: any = {
                            name: obj.name,
                            downLink: obj.downLink,
                            href: myurl,
                            imgUrl: obj.imgUrl,
                            years: Number(obj.name.substring(0, 4)) || 0,
                            type: type,
                        }
                        MovieService.insert(movie);
                    });
                    const result: any = {
                        movieLink: myurl
                    };
                    callback(null, result);
                });
        }
        // 控制最大并发数为5，在结果中取出callback返回来的整个结果数组。
        // mapLimit(arr, limit, iterator, [callback])
        async.mapLimit(eps, 5, (myurl: any, callback: any) => {
            fetchUrl(myurl, callback);
        }, () => {
            // 爬虫结束后的回调，可以做一些统计结果
            console.log('抓包结束，一共抓取了-->' + eps.length + '条数据');
            console.log('出错-->' + errLength.length + '条数据');
        });
    }

    // 获取下载链接
    getDownloadLink($: any, callback: any): void {
        let downLink: string = $('#Zoom table a').text();
        const movieName: string = $('.title_all h1 font').text();
        const imgUrl: string = $('#Zoom p img').attr('src');

        if (!downLink) {
            downLink = '该电影暂无链接';
        }
        const obj: any = {
            downLink: downLink,
            name: movieName,
            imgUrl: imgUrl,
            href: "",
            years: 0
        };
        callback(obj);
    }
}


