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
const error_1 = require("../../config/error");
// 用户信息
const service_1 = require("./../User/service");
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction}next
 * @param {IUserModel} user
 * @param {string} resMessage
 */
function index(req, res, next) {
    req.flash = { success: '欢迎光临~' };
    res.render('index', { req, title: '溜忙之道', path: '/' });
}
exports.index = index;
function userInfo(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield service_1.default.findOne(req.params.id);
            res.render('userInfo', { req, user, title: '个人中心', path: 'userInfo' });
        }
        catch (error) {
            next(new error_1.default(error.message.status, error.message));
        }
    });
}
exports.userInfo = userInfo;
function movie(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.render('movie', { req, title: '电影', path: 'movie' });
        }
        catch (error) {
            next(new error_1.default(error.message.status, error.message));
        }
    });
}
exports.movie = movie;
function movieItem(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.render('movieItem', { req, title: '电影详情', path: 'movie' });
        }
        catch (error) {
            next(new error_1.default(error.message.status, error.message));
        }
    });
}
exports.movieItem = movieItem;
function careerInformation(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.render('careerInformation', { req, title: '职业讯息', path: 'careerInformation' });
        }
        catch (error) {
            next(new error_1.default(error.message.status, error.message));
        }
    });
}
exports.careerInformation = careerInformation;
//# sourceMappingURL=index.js.map