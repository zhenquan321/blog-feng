import * as passport from 'passport';
import HttpError from '../../config/error';
import { NextFunction, Request, Response } from 'express';

import { IUserModel } from './../User/model';
import Time from '../../utils/Time';
import Filter from '../../utils/Filter';

import AuthService from './service';
import MovieService from '../Movie/service';
import BlogService from '../Blog/service';
import HandBookService from './../HandBook/service';
import UserService from './../User/service';
import ClassificationService from '../Classification/service';

interface RequestEd extends Request{
    flash:any;
}

/**
 * 
 * @param {RequeRequestEdst} req 
 * @param {Response} res 
 * @param {NextFunction}next 
 * @param {IUserModel} user 
 * @param {string} resMessage 
 */
export async function index(req: RequestEd, res: Response, next: NextFunction): Promise<any> {
   
    req.query = new Filter().excludeSpecial(req.query);
    let query: any = req.query || req.body;
    query.page = query.page >= 1 ? query.page - 1 : 0;
    const blogList: any = await BlogService.findAll(query);
    const classification: any = await ClassificationService.findAll({ type: 'classification' });

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

    res.render('blog/index', { req, pageInfo, classification, blogArray, title: '溜忙之道', path: '/' });
}


export async function movieItem(req: RequestEd, res: Response, next: NextFunction): Promise<void> {
    try {
        const getMovie: any = await MovieService.findOne(req.params.id);
        if (getMovie) {
            const movie: any = JSON.parse(JSON.stringify(getMovie));
            MovieService.update(req.params.id, { $set: { clickNum: ((getMovie.clickNum ? getMovie.clickNum : 0) + Math.round(Math.random() * 10)) } });
            movie.details.detailDes = movie.details.detailDes.split('detailDes');
            res.render('movie/movieItem', { req, movie, subject: movie, title: '电影', path: 'movie' });

        } else {
            res.render('404', { req, title: '未找到资源', path: 'movie' });
        }

    } catch (error) {
        next(new HttpError(error.message.status, error.message));
        res.render('404', { req, title: '未找到资源', path: 'movie' });
    }
}

export async function blogItem(req: RequestEd, res: Response, next: NextFunction): Promise<void> {
    try {
        const getBlog: any = await BlogService.findOne(req.params.id);

        if (getBlog) {
            const blog: any = JSON.parse(JSON.stringify(getBlog));
            //const marked: any = require('marked');
            // blog.content = marked(blog.content);
            // 增加阅读数
            BlogService.update(req.params.id, { $set: { pv: (getBlog.pv + Math.round(Math.random() * 10)) } });
            res.render('blog/blogItem', { req, blog, subject: blog, title: blog.title, path: '/' });
        } else {
            res.render('404', { req, title: '未找到资源', path: '/blog' });
        }

    } catch (error) {
        next(new HttpError(error.message.status, error.message));
        res.render('404', { req, title: '未找到资源', path: '/' });
    }
}

export async function blogCreate(req: RequestEd, res: Response, next: NextFunction): Promise<void> {
    try {
        const editor: string = 'markDown';
        const classifications: any = await ClassificationService.findAll({ type: 'classification' });
        const createType: any = await ClassificationService.findAll({ type: 'createType' });
        const mbId: string = "5dc7e479b9e1565fbe48666b";
        let blogId: any = (req.query && req.query.blogId) || mbId;
        let rtNlog: any = {};
        let mbBlog: any = {};

        if (blogId) {
            let findBlog: any = await BlogService.findOne(blogId);
            if (req.query && req.query.blogId) {
                rtNlog = findBlog;
            } else {
                mbBlog = findBlog;
            }
        }

        res.render('blog/blogCreateVditor', { req, editor, classifications, createType,blog: rtNlog, mbBlog, title: '发布博客', path: 'blogCreate' });

    } catch (error) {
        next(new HttpError(error.message.status, error.message));
        res.render('404', { req, title: '未找到资源', path: '/' });
    }
}


export async function userInfo(req: RequestEd, res: Response, next: NextFunction): Promise<void> {
    try {
        const user: IUserModel = await UserService.findOne(req.params.id);

        res.render('user/userInfo', { req, user, title: '个人中心', path: 'userInfo' });
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function movie(req: RequestEd, res: Response, next: NextFunction): Promise<void> {
    try {
        req.query = new Filter().excludeSpecial(req.query);
        let query: any = req.query || req.body;

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

        res.render('movie/movie', { pageInfo, req, AllCount, movieList: movieArray, title: '电影', path: 'movie' });
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}



export async function handBook(req: RequestEd, res: Response, next: NextFunction): Promise<void> {
    try {
        req.query = new Filter().excludeSpecial(req.query);
        let query: any = req.query || req.body;
        query.page = query.page >= 1 ? query.page - 1 : 0;
        const classifications: any = await ClassificationService.findAll({ type: 'handBookClassification' });
        const createType: any = await ClassificationService.findAll({ type: 'handBookCreateType' });
        const handBookArray: any = await HandBookService.findAll(query);

        res.render('handBook/handBook', { req, classifications, createType, handBookArray: handBookArray.data, title: '溜忙手册', path: 'handBook' });
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}


export async function createHandBook(req: RequestEd, res: Response, next: NextFunction): Promise<void> {

    try {
        const editor: string = 'markDown';
        const mbId: string = '';
        let handBookId: any = (req.query && req.query.handBookId) || mbId;
        let rtHandBook: any = handBookId ? await HandBookService.findOne(handBookId) : {};
        let title: string = '创建溜忙手册';
        let handBookJson:string=encodeURIComponent(JSON.stringify(rtHandBook)) ;

        res.render('handBook/createHandBook', { req, editor, title:rtHandBook.title||title,handBookJson,  handBook: rtHandBook, path: 'createHandBook' });

    } catch (error) {
        next(new HttpError(error.message.status, error.message));
        res.render('404', { req, title: '未找到资源', path: '/' });
    }

}
export async function viewHandBook(req: RequestEd, res: Response, next: NextFunction): Promise<void> {

    try {
        const editor: string = 'markDown';
        const mbId: string = '';
        let handBookId: any = (req.query && req.query.handBookId) || mbId;
        let rtHandBook: any = handBookId ? await HandBookService.findOne(handBookId) : {};
        let title: string = '溜忙手册';
        let handBookJson:string=encodeURIComponent(JSON.stringify(rtHandBook)) ;

        res.render('handBook/viewHandBook', { req, editor, title:rtHandBook.title||title,handBookJson, subject:{}, handBook: rtHandBook, path: 'createHandBook' });

    } catch (error) {
        next(new HttpError(error.message.status, error.message));
        res.render('404', { req, title: '未找到资源', path: '/' });
    }

}

