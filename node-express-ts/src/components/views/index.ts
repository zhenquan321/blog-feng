import * as passport from 'passport';
import AuthService from './service';
import MovieService from '../movie/service';
import HttpError from '../../config/error';
import { NextFunction, Request, Response } from 'express';

// 用户信息
import UserService from './../User/service';
import { IUserModel } from './../User/model';
import { connect } from 'http2';
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction}next 
 * @param {IUserModel} user 
 * @param {string} resMessage 
 */
export function index(req: Request, res: Response, next: NextFunction): void {
    req.flash = { success: '欢迎光临~' };
    res.render('index', { req, title: '溜忙之道', path: '/' });
}

export async function userInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const user: IUserModel = await UserService.findOne(req.params.id);

        res.render('userInfo', { req, user, title: '个人中心', path: 'userInfo' });
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function movie(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const pageQurey: any = req.query || req.body;

        pageQurey.page = pageQurey.page >= 1 ? pageQurey.page - 1 : 0;

        const movieList: any = await MovieService.findAll(pageQurey);//
        const movieArray: any = movieList.data;

        let baseUrl: string = req.path + '?';


        for (let key in pageQurey) {
            if (key !== 'page') {
                baseUrl = baseUrl + key + '=' + pageQurey[key] + '&';
            }
        }

        const pageInfo: any = {
            baseUrl,
            count: movieList.count,
            currentPage: pageQurey.page + 1 || 0,
            pageSize: pageQurey.pageSize || 20,
        };

        res.render('movie', { pageInfo, req, movieList: movieArray, title: '电影', path: 'movie' });
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function movieItem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const getMovie: any = await MovieService.findOne(req.params.id);
        if(getMovie){
            const movie:any = JSON.parse(JSON.stringify(getMovie));
            console.log(getMovie);
            movie.details.detailDes = movie.details.detailDes.split('detailDes');
            res.render('movieItem', { req, movie, title: '电影', path: 'movie' });
        }else{
            res.render('404', { req, title: '未找到资源', path: 'movie' });
        }
       
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
        res.render('404', { req, title: '未找到资源', path: 'movie' });
    }
}

export async function careerInformation(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        res.render('careerInformation', { req, title: '职业讯息', path: 'careerInformation' });
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
