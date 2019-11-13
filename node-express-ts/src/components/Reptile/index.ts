import * as passport from 'passport';
import HttpError from '../../config/error';
import { NextFunction, Request, Response } from 'express';
import { movieReptile, getMovieDetail } from './Reptile/movieReptile';
import { jobReptile } from './Reptile/jobReptile';
import MovieService from './../Movie/service';
/**
 * @export
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Promise < void >}
 */
export async function movieRt(req: Request, res: Response, next: NextFunction): Promise<void> {
    movieReptile();
    res.status(200).json(
        {
            status: 200,
            message: '已开始抓取电影~'
        });

}
export async function getMvDetail(req: Request, res: Response, next: NextFunction): Promise<void> {
    getMovieDetail();
    const movieList: any = await MovieService.findAll({ page: 0, pageSize: 100000, Reptile: true });
    res.status(200).json(
        {
            status: 200,
            msg: '开始抓取详情需抓取链接数为：' + movieList.data.length
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
