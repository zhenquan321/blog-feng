import * as passport from 'passport';
import AuthService from './service';
import HttpError from '../../config/error';
import { IUserModel } from '../User/model';
import { NextFunction, Request, Response } from 'express';

interface RequestEd extends Request{
    flash:any;
}
/**
 * 
 * @param {RequestEd} req 
 * @param {Response} res 
 * @param {NextFunction}next 
 * @param {IUserModel} user 
 * @param {string} resMessage 
 */
function passportRequestLogin(req: RequestEd, res: Response, next: NextFunction, user: IUserModel, resMessage: string): void {
    return req.logIn(user, (err: any) => {
        if (err) return next(new HttpError(err));
        // res.json({
        //     status: 200,
        //     logged: true,
        //     message: resMessage
        // });
        req.session.user = {
            _id: user._id,
            email: user.email,
            isAdmin: (user.isAdmin || false),
            profile: user.profile
        };
        req.flash = { success: '登录成功' };
        res.redirect('/');
    });
}

/**
 * @export
 * @param {RequestEd} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Promise < void >}
 */
export async function signup(req: RequestEd, res: Response, next: NextFunction): Promise<void> {
    try {
        const user: IUserModel = await AuthService.createUser(req.body);

        passportRequestLogin(req, res, next, user, 'Sign in successfull');
    } catch (error) {
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }
        res.json({
            status: 400,
            message: error.message
        });
    }
}

/**
 * @export
 * @param {RequestEd} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function login(req: RequestEd, res: Response, next: NextFunction): Promise<void> {
    passport.authenticate('local', (err: Error, user: IUserModel) => {
        if (err) {
            return next(new HttpError(400, err.message));
        }

        if (!user) {
            return res.json({
                status: 401,
                logged: false,
                message: 'Invalid credentials!'
            });
        }
        passportRequestLogin(req, res, next, user, 'Sign in successfull');
    })(req, res, next);
}
/**
 * @export
 * @param {RequestEd} req 
 * @param {Response} res 
 * @param {NextFunction} next
 * @returns {Promise < void >} 
 */
export async function signout(req: RequestEd, res: Response, next: NextFunction): Promise<void> {

    if (!req.user) {
        res.json({
            status: 401,
            logged: false,
            message: 'You are not authorized to app. Can\'t logout'
        });
    }

    if (req.user) {
        req.logout();
        // res.json({
        //     status: 200,
        //     logged: false,
        //     message: 'Successfuly logged out!'
        // });
        req.session.user = '';
        req.flash = { success: '退出成功~' };
        res.redirect('/');
    }

}
