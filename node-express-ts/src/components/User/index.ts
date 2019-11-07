import UserService from './service';
import { HttpError } from '../../config/error';
import { IUserModel } from './model';
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
        const users: IUserModel[] = await UserService.findAll();

        res.status(200).json(users);
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
        const user: IUserModel = await UserService.findOne(req.params.id);

        res.status(200).json(user);
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
        const user: IUserModel = await UserService.insert(req.body);

        res.status(201).json(user);
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
        const user: IUserModel = await UserService.remove(req.params.id);

        res.status(200).json(user);
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
export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const qurey: any = req.body || req.params;
        const userInfo: any = {
            name: qurey.name,
            gender: qurey.gender,
            location: qurey.location,
            Occupation: qurey.Occupation,
            picture: qurey.picture
        };

        const updateInfo: any = await UserService.update(qurey.id, userInfo);
        const user: any = await UserService.findOne(qurey.id);

        req.session.user = {
            _id: user._id,
            email: user.email,
            isAdmin: (user.isAdmin || false),
            profile: user.profile
        };

        console.log(updateInfo,req.session.user);

        req.flash = { success: '用户信息更新成功！' };

        if (updateInfo && updateInfo.ok === 1) {
            res.status(200).json({
                updateInfo,
                state: 0
            });
        } else {
            res.status(200).json({
                updateInfo,
                state: 0,
                mag: '用户信息更新失败！'
            });
        }

    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
