import JobService from './service';
import { HttpError } from '../../config/error';
import { IJobModel } from './model';
import { NextFunction, Request, Response } from 'express';

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */

export async function findAll(req: Request, res: Response, next: NextFunction): Promise < IJobModel[] > {
    try {
        const Jobs: IJobModel[] = await JobService.findAll();

        // res.status(200).json(Jobs);
        return Jobs;
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
export async function findOne(req: Request, res: Response, next: NextFunction): Promise < void > {
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
export async function create(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const Job: IJobModel = await JobService.insert(req.body);

        res.status(201).json(Job);
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
export async function remove(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const Job: IJobModel = await JobService.remove(req.params.id);

        res.status(200).json(Job);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
