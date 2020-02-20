import JobService from './../../Job/service';
import JobModel, { IJobModel } from './../../Job/model';
var superagent = require('superagent'); //发起请求 
var cheerio = require('cheerio'); //可以像jquer一样操作界面
var charset = require('superagent-charset'); //解决乱码问题:
charset(superagent);
var async = require('async'); //异步抓取
var eventproxy = require('eventproxy');  //流程控制
var ep = eventproxy();
let baseUrl: string = "https://www.zhipin.com/c101010100/?query=%E5%89%8D%E7%AB%AF&page=1&ka=page-1";

const http = require('http');
const fs = require('fs');



/**
 * @export
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Promise < void >}
 */
export async function jobReptile(): Promise<void> {

    const getJobListFun: any = new getJobList;

    const dyDLeiUrl: string[] = [
        'http://www.seac.gov.cn/seac/xxgk/mztj/index.shtml',
    ];

    for (let i: number = 0; i < dyDLeiUrl.length; i++) {
        setTimeout(() => {
            getJobListFun.index(dyDLeiUrl[i]);
        }, i * Math.ceil(Math.random() * 10) * 300);
    }
    setTimeout(() => {
        getJobListFun.goGetJobList();
    }, 3000);
}

class getJobList {
    baseUrl: string = 'https://www.dytt8.net/html/gndy/dyzz/index.html';
    errLength: string[] = [];
    urlList: string[] = [];

    async index(url: string): Promise<void> {
        if (url) {
            this.baseUrl = url;
        }
        console.log('开始抓取专题：' + this.baseUrl);
        superagent
            .get(this.baseUrl)
            .charset('gb2312')
            .end((err: any, sres: any) => {
                console.log('已抓取专题：' + this.baseUrl);
                // 常规的错误处理
                if (err) {
                    console.log('抓取' + this.baseUrl + '这条信息的时候出错了', err);
                    return
                }
                const $: any = cheerio.load(sres && sres.text);
                const elemPageList: any = $('.pagination-num ');

                const allPages: string = elemPageList.length;
                const baseHref: string = url.split('index.shtml')[0];
                this.getPagesJobList(Number(allPages), baseHref);
            });
    }
    getPagesJobList(allPages: number, baseHref: string): void {
        for (let i: number = 2; i < allPages + 1; i++) {
            this.urlList.push(baseHref + `index_${i}.html`);
        }
    }

    goGetJobList(): void {
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

        const movieArray: any = $('.w1  ul li  a');

        for (let i: number = 0; i < movieArray.length; i++) {
            let ss = movieArray[i];
            let href:string = "";
            this.downLoadWJ(href,"./../../../public/upload")
        }

    }

    downLoadWJ(url: string, dest: string): void {
        const file = fs.createWriteStream(dest);
        http.get(url, (res: any) => {
            if (res.statusCode !== 200) {
                res.on('end', () => {
                    console.log('download end');
                });
                // 进度、超时等
                file.on('finish', () => {
                    console.log('finish write file')
                    file.close();
                }).on('error', (err:any) => {
                    fs.unlink(dest);
                })
                res.pipe(file);
            }
        })
    }

}

