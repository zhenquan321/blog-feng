import JobService from './service';
import { HttpError } from '../../config/error';
import { IJobModel } from './model';
import { NextFunction, Request, Response } from 'express';
import { blogCreate } from '../Views/index';
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
        const Jobs: IJobModel[] = await JobService.findAll(query);

        res.status(200).json(Jobs);
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
        const Job: IJobModel = await JobService.findOne(req.params.id);

        res.status(200).json(Job);
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
        const Job: IJobModel | any = await JobService.insert(req.body);
        
        if (!Job.name) {
            req.flash = { warning: Job.mag };
        }
        blogCreate(req, res, next);

        // res.status(200).json(Job);
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
        const Job: IJobModel = await JobService.remove(req.params.id);

        res.status(200).json(Job);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
