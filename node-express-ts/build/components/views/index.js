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
const service_1 = require("../Movie/service");
const service_2 = require("../Blog/service");
const service_3 = require("../Classification/service");
const error_1 = require("../../config/error");
const Time_1 = require("../../utils/Time");
// 用户信息
const service_4 = require("./../User/service");
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction}next
 * @param {IUserModel} user
 * @param {string} resMessage
 */
function index(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = req.query || req.body;
        query.page = query.page >= 1 ? query.page - 1 : 0;
        const blogList = yield service_2.default.findAll(query);
        const classification = yield service_3.default.findAll();
        const blogArray = blogList.data || [];
        let baseUrl = req.path + '?';
        for (let key in query) {
            if (key !== 'page') {
                baseUrl = baseUrl + key + '=' + query[key] + '&';
            }
        }
        const pageInfo = {
            baseUrl,
            count: blogList.count,
            currentPage: query.page + 1 || 0,
            pageSize: query.pageSize || 20,
        };
        req.flash = { success: '欢迎光临~' };
        res.render('index', { req, pageInfo, classification, blogArray, title: '溜忙之道', path: '/' });
    });
}
exports.index = index;
function userInfo(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield service_4.default.findOne(req.params.id);
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
            const query = req.query || req.body;
            query.page = query.page >= 1 ? query.page - 1 : 0;
            const movieList = yield service_1.default.findAll(query); //
            const AllCount = yield service_1.default.getCount();
            const movieArray = movieList.data;
            let baseUrl = req.path + '?';
            for (let key in query) {
                if (key !== 'page') {
                    baseUrl = baseUrl + key + '=' + query[key] + '&';
                }
            }
            const pageInfo = {
                baseUrl,
                count: movieList.count,
                currentPage: query.page + 1 || 0,
                pageSize: query.pageSize || 12,
            };
            res.render('movie', { pageInfo, req, AllCount, movieList: movieArray, title: '电影', path: 'movie' });
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
                service_1.default.update(req.params.id, { $set: { clickNum: (getMovie.clickNum + Math.round(Math.random() * 10)) } });
                movie.details.detailDes = movie.details.detailDes.split('detailDes');
                res.render('movieItem', { req, movie, subject: movie, title: '电影', path: 'movie' });
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
        const query = req.query || req.body;
        query.page = query.page >= 1 ? query.page - 1 : 0;
        const blogList = yield service_2.default.findAll(query);
        const classification = yield service_3.default.findAll();
        const blogArray = blogList.data || [];
        let baseUrl = req.path + '?';
        blogArray.forEach((element) => {
            element.createdAt = new Time_1.default().formatDate(element.createdAt);
            if (element.pv > 50) {
                element.isHot = true;
            }
            if (element.pv > 100) {
                element.isRecommend = '荐';
            }
            if (element.pv > 200) {
                element.isRecommend = '榜';
            }
        });
        for (let key in query) {
            if (key !== 'page') {
                baseUrl = baseUrl + key + '=' + query[key] + '&';
            }
        }
        const pageInfo = {
            baseUrl,
            count: blogList.count,
            currentPage: query.page + 1 || 0,
            pageSize: query.pageSize || 20,
        };
        req.flash = { success: '欢迎光临~' };
        res.render('index', { req, pageInfo, classification, blogArray, title: '溜忙之道', path: '/' });
    });
}
exports.blog = blog;
function blogItem(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getBlog = yield service_2.default.findOne(req.params.id);
            if (getBlog) {
                const blog = JSON.parse(JSON.stringify(getBlog));
                //const marked: any = require('marked');
                // blog.content = marked(blog.content);
                // 增加阅读数
                service_2.default.update(req.params.id, { $set: { pv: (getBlog.pv + Math.round(Math.random() * 10)) } });
                res.render('blogItem', { req, blog, subject: blog, title: blog.title, path: '/' });
            }
            else {
                res.render('404', { req, title: '未找到资源', path: '/' });
            }
        }
        catch (error) {
            next(new error_1.default(error.message.status, error.message));
            res.render('404', { req, title: '未找到资源', path: '/' });
        }
    });
}
exports.blogItem = blogItem;
function blogCreate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const editor = 'markDown';
            const classifications = yield service_3.default.findAll();
            const mbId = req.hostname != "localhost" ? "5dc7e479b9e1565fbe48666b" : "";
            let blogId = (req.query && req.query.blogId) || mbId;
            if (blogId) {
                const blog = yield service_2.default.findOne(blogId);
                if (req.hostname != "localhost") {
                    blog.isMb = true;
                }
            }
            console.log(blogId, blog);
            res.render('blogCreateVditor', { req, editor, blog, classifications, title: '发布博客', path: 'blogCreate' });
        }
        catch (error) {
            next(new error_1.default(error.message.status, error.message));
            res.render('404', { req, title: '未找到资源', path: '/' });
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