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
const service_1 = require("../movie/service"); // 目录 Movie 大小写有疑问
const error_1 = require("../../config/error");
// 用户信息
const service_2 = require("./../User/service");
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
            const user = yield service_2.default.findOne(req.params.id);
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
            const pageQurey = req.query || req.body;
            pageQurey.page = pageQurey.page >= 1 ? pageQurey.page - 1 : 0;
            const movieList = yield service_1.default.findAll(pageQurey); //
            const movieArray = movieList.data;
            let baseUrl = req.path + '?';
            for (let key in pageQurey) {
                if (key !== 'page') {
                    baseUrl = baseUrl + key + '=' + pageQurey[key] + '&';
                }
            }
            const pageInfo = {
                baseUrl,
                count: movieList.count,
                currentPage: pageQurey.page + 1 || 0,
                pageSize: pageQurey.pageSize || 20,
            };
            res.render('movie', { pageInfo, req, movieList: movieArray, title: '电影', path: 'movie' });
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
            const getMovie = yield service_1.default.findOne(req.params.id);
            if (getMovie) {
                const movie = JSON.parse(JSON.stringify(getMovie));
                movie.details.detailDes = movie.details.detailDes.split('detailDes');
                res.render('movieItem', { req, movie, title: '电影', path: 'movie' });
            }
            else {
                res.render('404', { req, title: '未找到资源', path: 'movie' });
            }
        }
        catch (error) {
            next(new error_1.default(error.message.status, error.message));
            res.render('404', { req, title: '未找到资源', path: 'movie' });
        }
    });
}
exports.movieItem = movieItem;
function blog(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pageQurey = req.query || req.body;
            pageQurey.page = pageQurey.page >= 1 ? pageQurey.page - 1 : 0;
            const movieList = yield service_1.default.findAll(pageQurey); //
            const movieArray = movieList.data;
            let baseUrl = req.path + '?';
            for (let key in pageQurey) {
                if (key !== 'page') {
                    baseUrl = baseUrl + key + '=' + pageQurey[key] + '&';
                }
            }
            const pageInfo = {
                baseUrl,
                count: movieList.count,
                currentPage: pageQurey.page + 1 || 0,
                pageSize: pageQurey.pageSize || 20,
            };
            res.render('movie', { pageInfo, req, movieList: movieArray, title: '电影', path: '/' });
        }
        catch (error) {
            next(new error_1.default(error.message.status, error.message));
        }
    });
}
exports.blog = blog;
function blogItem(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getMovie = yield service_1.default.findOne(req.params.id);
            if (getMovie) {
                const movie = JSON.parse(JSON.stringify(getMovie));
                movie.details.detailDes = movie.details.detailDes.split('detailDes');
                res.render('movieItem', { req, movie, title: '电影', path: 'movie' });
            }
            else {
                res.render('404', { req, title: '未找到资源', path: 'movie' });
            }
        }
        catch (error) {
            next(new error_1.default(error.message.status, error.message));
            res.render('404', { req, title: '未找到资源', path: 'movie' });
        }
    });
}
exports.blogItem = blogItem;
function blogCreate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const editor = 'markDown';
            res.render('blogCreate', { req, editor, title: '发布博客', path: 'blogCreate' });
        }
        catch (error) {
            next(new error_1.default(error.message.status, error.message));
            res.render('404', { req, title: '未找到资源', path: 'movie' });
        }
    });
}
exports.blogCreate = blogCreate;
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