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
            const query = req.query || req.body;
            const Comments = yield service_1.default.findAll(query);
            res.status(200).json({
                state: 0,
                msg: '',
                data: Comments.data,
                count: Comments.count
            });
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
            const Comment = yield service_1.default.findOne(req.params.id);
            res.status(200).json(Comment);
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
            // 文本审核案例
            const shData = yield baiduSh_1.default.textCensorUserDefined(req.body.content);
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
            res.status(200).json({
                state,
                msg,
                data,
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
//# sourceMappingURL=index.js.map