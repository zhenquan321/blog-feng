import UserService from './service';
import { HttpError } from '../../config/error';
import { IUserModel } from './model';
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
        const query: any = req.body || req.params;
        const userInfo: any = {
            name: query.name,
            gender: query.gender,
            location: query.location,
            Occupation: query.Occupation,
            picture: query.picture
        };

        // 用户头像审核；&& 用户填写内容审核；暂时不用
        const shData: any = (await client.faceAudit([('http://' + req.host + query.picture)], 'url', 1)).result[0];
        const userInfoSh: string = userInfo.name + userInfo.location + userInfo.Occupation + userInfo.gender;
        const shDataNei: any = await client.textCensorUserDefined(userInfoSh);

        // if ((!shData) || shData.error_msg || (shData.result && shData.result[0] && shData.result[0].res_code === 0)) {
        //     console.log(shData, '头像审核通过');
        // } else {
        //     res.status(200).json({
        //         state: 1,
        //         msg: '头像违规,请再次上传',
        //         data: shData
        //     });
        // }

        if (shDataNei.conclusionType === 1) {
            console.log(shDataNei, '用户填写内容审核通过');
        } else {
            res.status(200).json({
                state: 1,
                msg: shDataNei.data[0].msg,
                data: shData
            });

            return
        }

        const updateInfo: any = await UserService.update(query.id, userInfo);
        const user: any = await UserService.findOne(query.id);

        req.session.user = {
            _id: user._id,
            email: user.email,
            isAdmin: (user.isAdmin || false),
            profile: user.profile
        };

        req.flash = { success: '用户信息更新成功！' };

        if (updateInfo && updateInfo.ok === 1) {
            res.status(200).json({
                updateInfo,
                state: 0
            });
        } else {
            res.status(200).json({
                updateInfo,
                state: 1,
                mag: '用户信息更新失败！'
            });
        }

    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
