import * as passport from 'passport';
import HttpError from '../../config/error';
import { NextFunction, Request, Response } from 'express';
import { movieReptile } from './Reptile/movieReptile';
import { jobReptile } from './Reptile/jobReptile';
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
            message: "已开始抓取电影~"
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
            message: "已开始抓取招聘信息~"
        });
}
