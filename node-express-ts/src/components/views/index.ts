import * as passport from 'passport';
import AuthService from './service';
import HttpError from '../../config/error';
import { NextFunction, Request, Response } from 'express';

// 用户信息
import UserService from './../User/service';
import { IUserModel } from './../User/model';
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction}next 
 * @param {IUserModel} user 
 * @param {string} resMessage 
 */
export function index(req: Request, res: Response, next: NextFunction): void {
    req.flash = { success: '欢迎光临~' };
    res.render('index',{ req, title:'溜忙之道' ,path:'/' });
}

export async function userInfo(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const user: IUserModel = await UserService.findOne(req.params.id);

        res.render('userInfo',{  req, user,title:'个人中心' ,path:'userInfo' });
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function movie(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {

        res.render('movie',{ req,title:'电影',path:'movie' });
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function movieItem(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {

        res.render('movieItem',{  req,title:'电影详情',path:'movie' });
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function careerInformation(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {

        res.render('careerInformation',{  req,title:'职业讯息' ,path:'careerInformation' });
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
