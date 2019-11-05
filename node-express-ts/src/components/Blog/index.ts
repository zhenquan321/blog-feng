import BlogService from './service';
import { HttpError } from '../../config/error';
import { IBlogModel } from './model';
import { NextFunction, Request, Response } from 'express';

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const Blogs: IBlogModel[] = await BlogService.findAll();

        res.status(200).json(Blogs);
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
        const Blog: IBlogModel = await BlogService.findOne(req.params.id);

        res.status(200).json(Blog);
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
        const Blog: IBlogModel = await BlogService.insert(req.body);

        if (Blog && Blog._id) {
            res.status(200).json({
                Blog,
                state:0
            });
        }else{
            res.status(200).json({
                Blog,
                state:1
            });
        }
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
        const Blog: IBlogModel = await BlogService.remove(req.params.id);

        res.status(200).json(Blog);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
