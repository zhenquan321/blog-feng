import BlogService from './service';
import ViewService from '../Views/service';
import { HttpError } from '../../config/error';
import { IBlogModel } from './model';
import { NextFunction, Request, Response } from 'express';
import client from './../../utils/baiduSh';
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const query: any = req.query || req.body;
        query.page = query.page >= 1 ? query.page - 1 : 0;
        query.userid = req.user?req.user.id:""
        const Blogs: any = await BlogService.findAll(query);//

        res.status(200).json({
            state: 0,
            data: Blogs,
            msg: ''
        });
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        const getBlog: IBlogModel = await BlogService.findOne(req.params.id);
        const blog: any = JSON.parse(JSON.stringify(getBlog));
        // const marked: any = require('marked');
        // blog.content = marked(blog.content);

        // 增加阅读数
        BlogService.update(req.params.id, { $set: { pv: (blog.pv + Math.round(Math.random() * 10)) } });
        res.status(200).json({
            state: 0,
            data: blog,
            msg: ''
        });
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        const shData: any = await client.textCensorUserDefined(req.body.content + req.body.title);
        let data: any = {};
        let state: number = 0;
        let msg: string = '';

        if (shData.conclusionType === 1) {
            data = await BlogService.insert(req.body);
        } else {
            data = shData.data;
            state = 1;
            msg = shData.data[0].msg;
        }

        if (!data && !data._id) {
            state = 1;
        }

        res.status(200).json({
            msg,
            state,
            Blog: data,
        });
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */


export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const Blog: IBlogModel = await BlogService.update(req.params.id, { deleted: true });
        if (Blog) {
            res.status(200).json({
                Blog,
                state: 0
            });
        }

    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}


export async function thumbsUp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const qurey = req.body;
        const BlogFid: IBlogModel = await BlogService.findOne(qurey.id);
        const thumbsUp: number = BlogFid.thumbsUp + Number(qurey.num);
        const Blog: IBlogModel = await BlogService.update(req.params.id || req.body.id, {
            thumbsUp
        });

        if (Blog) {
            res.status(200).json({
                thumbsUp,
                Blog,
                state: 0
            });
        }

    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}


export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        let id = req.params.blogId || req.body.blogId;
        let updateInfo = req.params.blogId ? req.params : req.body;
        delete updateInfo.blogId;

        const Blog: IBlogModel = await BlogService.update(id, { $set: updateInfo });

        if (Blog) {
            res.status(200).json({
                Blog,
                msg: "修改成功",
                state: 0
            });
        }

    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}