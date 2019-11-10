import ToolService from './service';
import { HttpError } from '../../config/error';
import { NextFunction, Request, Response } from 'express';


/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function upload(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const file: any = await ToolService.upload(req,res);
        
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
