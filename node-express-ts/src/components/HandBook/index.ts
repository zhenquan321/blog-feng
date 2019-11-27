import HandBookService from './service';
import ViewService from '../Views/service';
import { HttpError } from '../../config/error';
import { IHandBookModel } from './model';
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

        const HandBooks: any = await HandBookService.findAll(query);//

        res.status(200).json({
            state:0,
            data:HandBooks,
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
export async function findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        const getHandBook: IHandBookModel = await HandBookService.findOne(req.params.id);
        const HandBook: any = JSON.parse(JSON.stringify(getHandBook));
        // const marked: any = require('marked');
        // HandBook.content = marked(HandBook.content);

        // 增加阅读数
        HandBookService.update(req.params.id, { $set: { pv: (HandBook.pv + Math.round(Math.random() * 10)) } });
        res.status(200).json({
            state:0,
            data:HandBook,
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
export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        const shData: any = await client.textCensorUserDefined(req.body.describe + req.body.title);
        let data: any = {};
        let state: number = 0;
        let msg: string = '';

        if (shData.conclusionType === 1) {
            data = await HandBookService.insert(req.body);
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
            data: data,
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
        const HandBook: IHandBookModel = await HandBookService.update(req.params.id, { deleted: true });
        if (HandBook) {
            res.status(200).json({
                HandBook,
                state: 0
            });
        }

    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}


export async function thumbsUp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const HandBookFid: IHandBookModel = await HandBookService.findOne(req.params.id || req.body.id);
        const thumbsUp: number = HandBookFid.thumbsUp + 1;
        const HandBook: IHandBookModel = await HandBookService.update(req.params.id || req.body.id, {
            thumbsUp
        });

        if (HandBook) {
            res.status(200).json({
                thumbsUp,
                HandBook,
                state: 0
            });
        }

    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}


export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        let id = req.params._id || req.body._id;
        let updateInfo = req.params._id ? req.params : req.body;
        delete updateInfo._id;

        const HandBook: IHandBookModel = await HandBookService.update(id, { $set: updateInfo });

        if (HandBook) {
            res.status(200).json({
                HandBook,
                msg: "修改成功",
                state: 0
            });
        }

    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}