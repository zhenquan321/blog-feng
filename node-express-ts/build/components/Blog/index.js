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
            const Blogs = yield service_1.default.findAll();
            res.status(200).json(Blogs);
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
            const Blog = yield service_1.default.findOne(req.params.id);
            res.status(200).json(Blog);
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
            const shData = yield baiduSh_1.default.textCensorUserDefined(req.body.content + req.body.title);
            let data = {};
            let state = 0;
            let msg = '';
            if (shData.conclusionType === 1) {
                data = yield service_1.default.insert(req.body);
            }
            else {
                data = shData.data;
                state = 1;
                msg = shData.data[0].msg;
            }
            if (!data && !data._id) {
                state = 1;
            }
            res.status(200).json({
                msg,
                state,
                Blog: data,
            });
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
            const Blog = yield service_1.default.update(req.params.id, { deleted: true });
            if (Blog) {
                res.status(200).json({
                    Blog,
                    state: 0
                });
            }
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.remove = remove;
function thumbsUp(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const BlogFid = yield service_1.default.findOne(req.params.id || req.body.id);
            const thumbsUp = BlogFid.thumbsUp + 1;
            const Blog = yield service_1.default.update(req.params.id || req.body.id, {
                thumbsUp
            });
            if (Blog) {
                res.status(200).json({
                    thumbsUp,
                    Blog,
                    state: 0
                });
            }
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.thumbsUp = thumbsUp;
function update(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = req.params._id || req.body._id;
            let updateInfo = req.params._id ? req.params : req.body;
            delete updateInfo._id;
            const Blog = yield service_1.default.update(id, { $set: updateInfo });
            if (Blog) {
                res.status(200).json({
                    Blog,
                    msg: "修改成功",
                    state: 0
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