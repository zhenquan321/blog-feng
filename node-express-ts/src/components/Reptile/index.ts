import * as passport from 'passport';
import HttpError from '../../config/error';
import { NextFunction, Request, Response } from 'express';
import { movieReptile, getMovieDetail } from './Reptile/movieReptile';
import { jobReptile } from './Reptile/jobReptile';
import MovieService from './../Movie/service';

// 定时执行
const schedule:any = require('node-schedule');
let rule:any = new schedule.RecurrenceRule();

/**
 * @export
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Promise < void >}
 */
export async function movieRt(req: Request, res: Response, next: NextFunction): Promise<void> {
    //每天0点开始执行
    rule.hour =0;
    rule.minute =0;
    rule.second =0;
    let movieRtJob = schedule.scheduleJob(rule, () => {
        console.log("movieRtJob",new Date());
        movieReptile();
    });
    res.status(200).json(
        {
            status: 200,
            message: '已开启定时抓取~'
        });

}
export async function getMvDetail(req: Request, res: Response, next: NextFunction): Promise<void> {
    const movieList: any = await MovieService.findAll({ page: 0, pageSize: 100000, Reptile: true });
    //每天1点开始执行
    rule.hour =1;
    rule.minute =0;
    rule.second =0;
    let getMvDetailsJob = schedule.scheduleJob(rule, () => {
        console.log("getMvDetailsJob",new Date());
        getMovieDetail();
    });

    res.status(200).json(
        {
            status: 200,
            msg: '已开启定时抓取详情，现需抓取链接数为：' + movieList.data.length
        });

}


/**
 * @export
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Promise < void >}
 */
export async function jobRt(req: Request, res: Response, next: NextFunction): Promise<void> {
    jobReptile();
    res.status(200).json(
        {
            status: 200,
            message: '已开始抓取招聘信息~'
        });
}
