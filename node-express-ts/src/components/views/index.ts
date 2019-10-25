import * as passport from 'passport';
import AuthService from './service';
import HttpError from '../../config/error';
import { NextFunction, Request, Response } from 'express';
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction}next 
 * @param {IUserModel} user 
 * @param {string} resMessage 
 */
export function index(req: Request, res: Response, next: NextFunction): void {
    res.render('index',{ title:'hello world' });
}




