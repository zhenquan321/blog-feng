import * as passport from 'passport';
import AuthService from './service';
import MovieService from '../Movie/service';
import BlogService from '../Blog/service';

import ClassificationService from '../Classification/service';
import HttpError from '../../config/error';
import { NextFunction, Request, Response } from 'express';
import Time from '../../utils/Time';

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

    const query: any = req.query || req.body;

    query.page = query.page >= 1 ? query.page - 1 : 0;

    const blogList: any = await BlogService.findAll(query);
    const classification: any = await ClassificationService.findAll();

    const blogArray: any = blogList.data || [];

    let baseUrl: string = req.path + '?';

    for (let key in query) {
        if (key !== 'page') {
            baseUrl = baseUrl + key + '=' + query[key] + '&';
        }
    }

    const pageInfo: any = {
        baseUrl,
        count: blogList.count,
        currentPage: query.page + 1 || 0,
        pageSize: query.pageSize || 20,
    };

    req.flash = { success: '欢迎光临~' };

    res.render('index', { req, pageInfo, classification, blogArray, title: '溜忙之道', path: '/' });
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
        const query: any = req.query || req.body;

        query.page = query.page >= 1 ? query.page - 1 : 0;

        const movieList: any = await MovieService.findAll(query);//
        const AllCount: number = await MovieService.getCount();
        const movieArray: any = movieList.data;

        let baseUrl: string = req.path + '?';


        for (let key in query) {
            if (key !== 'page') {
                baseUrl = baseUrl + key + '=' + query[key] + '&';
            }
        }

        const pageInfo: any = {
            baseUrl,
            count: movieList.count,
            currentPage: query.page + 1 || 0,
            pageSize: query.pageSize || 12,
        };

        res.render('movie', { pageInfo, req, AllCount, movieList: movieArray, title: '电影', path: 'movie' });
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function movieItem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const getMovie: any = await MovieService.findOne(req.params.id);

        if (getMovie) {
            const movie: any = JSON.parse(JSON.stringify(getMovie));
            MovieService.update(req.params.id, { $set: { clickNum: (getMovie.clickNum + Math.round(Math.random() * 10)) } });
            movie.details.detailDes = movie.details.detailDes.split('detailDes');
            res.render('movieItem', { req, movie, subject: movie, title: '电影', path: 'movie' });

        } else {
            res.render('404', { req, title: '未找到资源', path: 'movie' });
        }

    } catch (error) {
        next(new HttpError(error.message.status, error.message));
        res.render('404', { req, title: '未找到资源', path: 'movie' });
    }
}

export async function blog(req: Request, res: Response, next: NextFunction): Promise<void> {
    const query: any = req.query || req.body;

    query.page = query.page >= 1 ? query.page - 1 : 0;

    const blogList: any = await BlogService.findAll(query);
    const classification: any = await ClassificationService.findAll();

    const blogArray: any = blogList.data || [];

    let baseUrl: string = req.path + '?';

    blogArray.forEach((element: any) => {
        element.createdAt = new Time().formatDate(element.createdAt);
        if (element.pv > 50) {
            element.isHot = true;
        }
        if (element.pv > 100) {
            element.isRecommend = '荐';
        }
        if (element.pv > 200) {
            element.isRecommend = '榜';
        }
    });

    for (let key in query) {
        if (key !== 'page') {
            baseUrl = baseUrl + key + '=' + query[key] + '&';
        }
    }

    const pageInfo: any = {
        baseUrl,
        count: blogList.count,
        currentPage: query.page + 1 || 0,
        pageSize: query.pageSize || 20,
    };

    req.flash = { success: '欢迎光临~' };
    res.render('index', { req, pageInfo, classification, blogArray, title: '溜忙之道', path: '/' });
}

export async function blogItem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const getBlog: any = await BlogService.findOne(req.params.id);


        if (getBlog) {
            const blog: any = JSON.parse(JSON.stringify(getBlog));
            //const marked: any = require('marked');
            // blog.content = marked(blog.content);
            // 增加阅读数
            BlogService.update(req.params.id, { $set: { pv: (getBlog.pv + Math.round(Math.random() * 10)) } });
            res.render('blogItem', { req, blog, subject: blog, title: blog.title, path: '/' });
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
        const mbId: string = req.hostname != "localhost" ? "5dce479b9e1565fbe48666b" : "";
        let blogId: string = (req.query && req.query.blogId) || mbId;
        if(blogId){
            const blog: any = await BlogService.findOne(blogId);
            if (req.hostname != "localhost") {
                blog.isMb = true;
            }
        }
        
        console.log(blogId,blog);
        res.render('blogCreateVditor', { req, editor, blog, classifications, title: '发布博客', path: 'blogCreate' });

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
