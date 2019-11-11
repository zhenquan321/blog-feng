import CommentService from './service';
import { HttpError } from '../../config/error';
import { ICommentModel } from './model';
import { NextFunction, Request, Response } from 'express';
import { blogCreate } from '../Views/index';
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
        const Comments: any = await CommentService.findAll(query);

        res.status(200).json({
            state:0,
            msg:'',
            data:Comments.data,
            count:Comments.count
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
        const Comment: ICommentModel = await CommentService.findOne(req.params.id);

        res.status(200).json(Comment);
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
       
        const Comment: ICommentModel | any = await CommentService.insert(req.body);
        
        if (!Comment.name) {
            req.flash = { warning: Comment.mag };
        }
        
        res.status(200).json({
            state:0,
            data:Comment,
            msg:''
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
        const Blog: ICommentModel = await CommentService.update(req.params.id, { deleted: true });
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
