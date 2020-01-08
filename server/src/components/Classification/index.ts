import ClassificationService from './service';
import { HttpError } from '../../config/error';
import { IClassificationModel } from './model';
import { NextFunction, Request, Response } from 'express';
interface RequestEd extends Request{
    flash:any;
}
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
        const Classifications: IClassificationModel[] = await ClassificationService.findAll(query);

        res.status(200).json(Classifications);
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
        const Classification: IClassificationModel = await ClassificationService.findOne(req.params.id);

        res.status(200).json(Classification);
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
export async function create(req: RequestEd, res: Response, next: NextFunction): Promise<void> {
    try {
        const Classification: IClassificationModel | any = await ClassificationService.insert(req.body);
        
        if (!Classification.name) {
            req.flash = { warning: Classification.mag };
        }
        
        res.status(200).json({
            state:Classification.state||0,
            data:Classification,
            msg:Classification.msg||""
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
        const Classification: IClassificationModel = await ClassificationService.remove(req.params.id);

        res.status(200).json(Classification);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
