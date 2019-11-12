"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = require("./service");
const error_1 = require("../../config/error");
const baiduSh_1 = require("./../../utils/baiduSh");
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function findAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield service_1.default.findAll();
            res.status(200).json(users);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.findAll = findAll;
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function findOne(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield service_1.default.findOne(req.params.id);
            res.status(200).json(user);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.findOne = findOne;
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield service_1.default.insert(req.body);
            res.status(201).json(user);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.create = create;
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function remove(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield service_1.default.remove(req.params.id);
            res.status(200).json(user);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.remove = remove;
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function update(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = req.body || req.params;
            const userInfo = {
                name: query.name,
                gender: query.gender,
                location: query.location,
                Occupation: query.Occupation,
                picture: query.picture
            };
            // 用户头像审核；&& 用户填写内容审核；暂时不用
            const shData = (yield baiduSh_1.default.faceAudit([('http://' + req.host + query.picture)], 'url', 1)).result[0];
            const userInfoSh = userInfo.name + userInfo.location + userInfo.Occupation + userInfo.gender;
            const shDataNei = yield baiduSh_1.default.textCensorUserDefined(userInfoSh);
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
            }
            else {
                res.status(200).json({
                    state: 1,
                    msg: shDataNei.data[0].msg,
                    data: shData
                });
                return;
            }
            const updateInfo = yield service_1.default.update(query.id, userInfo);
            const user = yield service_1.default.findOne(query.id);
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
            }
            else {
                res.status(200).json({
                    updateInfo,
                    state: 1,
                    mag: '用户信息更新失败！'
                });
            }
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.update = update;
//# sourceMappingURL=index.js.map