import * as passport from 'passport';
import AuthService from './service';
import MovieService from '../movie/service'; // 目录 Movie 大小写有疑问
import BlogService from '../Blog/service'; // 目录 Movie 大小写有疑问

import ClassificationService from '../Classification/service'; // 目录 Movie 大小写有疑问
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
export async function index(req: Request, res: Response, next: NextFunction): Promise<any> {
    req.flash = { success: '欢迎光临~' };


    const pageQurey: any = req.query || req.body;

    pageQurey.page = pageQurey.page >= 1 ? pageQurey.page - 1 : 0;

    const blogList: any = await BlogService.findAll(pageQurey);//
    const blogArray: any = blogList.data || [];

    let baseUrl: string = req.path + '?';


    for (let key in pageQurey) {
        if (key !== 'page') {
            baseUrl = baseUrl + key + '=' + pageQurey[key] + '&';
        }
    }

    const pageInfo: any = {
        baseUrl,
        count: blogList.count,
        currentPage: pageQurey.page + 1 || 0,
        pageSize: pageQurey.pageSize || 20,
    };

    console.log(blogArray);
    res.render('index', { req,pageInfo, blogArray, title: '溜忙之道', path: '/' });
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

        if (getMovie) {
            const movie: any = JSON.parse(JSON.stringify(getMovie));

            movie.details.detailDes = movie.details.detailDes.split('detailDes');
            res.render('movieItem', { req, movie, title: '电影', path: 'movie' });
        } else {
            res.render('404', { req, title: '未找到资源', path: 'movie' });
        }

    } catch (error) {
        next(new HttpError(error.message.status, error.message));
        res.render('404', { req, title: '未找到资源', path: 'movie' });
    }
}

export async function blog(req: Request, res: Response, next: NextFunction): Promise<void> {
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

        res.render('movie', { pageInfo, req, movieList: movieArray, title: '电影', path: '/' });
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function blogItem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const getBlog: any = await BlogService.findOne(req.params.id);

        if (getBlog) {
            const blog: any = JSON.parse(JSON.stringify(getBlog));

            console.log(blog);
            res.render('blogItem', { req, blog, title: blog.title, path: '/' });
        } else {
            res.render('404', { req, title: '未找到资源', path: '/' });
        }

    } catch (error) {
        next(new HttpError(error.message.status, error.message));
        res.render('404', { req, title: '未找到资源', path: '/' });
    }
}

export async function blogCreate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const editor: string = 'markDown';
        const classifications: any = await ClassificationService.findAll();

        console.log(classifications);

        res.render('blogCreate', { req, editor, classifications, title: '发布博客', path: 'blogCreate' });

    } catch (error) {
        next(new HttpError(error.message.status, error.message));
        res.render('404', { req, title: '未找到资源', path: '/' });
    }
}




export async function careerInformation(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        res.render('careerInformation', { req, title: '职业讯息', path: 'careerInformation' });
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
