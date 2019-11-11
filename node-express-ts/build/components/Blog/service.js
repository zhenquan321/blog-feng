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
const model_1 = require("./model");
const mongoose_1 = require("mongoose");
const service_1 = require("../Classification/service");
const service_2 = require("../User/service");
const service_3 = require("../Comment/service");
const Time_1 = require("./../../utils/Time");
/**
 * @export
 * @implements {IBlogModelService}
 */
const BlogService = {
    /**
     * @returns {Promise < IBlogModel[] >}
     * @memberof BlogService
     */
    findAll(pageQurey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = pageQurey && pageQurey.page ? Number(pageQurey.page) : 0;
                const pageSize = pageQurey && pageQurey.pageSize ? Number(pageQurey.pageSize) : 20;
                let findKeyObj = { deleted: { $ne: true } };
                const sort = {};
                if (pageQurey && pageQurey.sort) {
                    sort[pageQurey.sort] = -1;
                }
                else {
                    sort.createdAt = -1;
                }
                if (pageQurey && pageQurey.blogSearch) {
                    const blogSearchKeyWords = { $regex: pageQurey.blogSearch, $options: 'i' };
                    findKeyObj = {
                        $or: [
                            { title: blogSearchKeyWords },
                            { content: blogSearchKeyWords }
                        ]
                    };
                }
                if (pageQurey && pageQurey.keywords) {
                    findKeyObj.keywords = pageQurey.keywords;
                }
                if (pageQurey && pageQurey.classifications) {
                    findKeyObj.classifications = pageQurey.classifications;
                }
                const BlogListFind = yield model_1.default.find(findKeyObj).sort(sort).limit(pageSize).skip(page * pageSize);
                const BlogList = JSON.parse(JSON.stringify(BlogListFind));
                const count = yield model_1.default.find(findKeyObj).countDocuments();
                for (let i = 0; i < BlogList.length; i++) {
                    BlogList[i].author = yield service_2.default.findOne(BlogList[i].author);
                    BlogList[i].classifications = yield service_1.default.findOne(BlogList[i].classifications);
                    BlogList[i].comments = yield service_3.default.count(BlogList[i]._id);
                    BlogList[i].createdAt = new Time_1.default().formatDate(BlogList[i].createdAt);
                    if (BlogList[i].pv > 100) {
                        BlogList[i].isHot = true;
                    }
                    if (BlogList[i].pv > 200) {
                        BlogList[i].isRecommend = '荐';
                    }
                    if (BlogList[i].pv > 200 && BlogList[i].comments > 10) {
                        BlogList[i].isRecommend = '榜';
                    }
                }
                return {
                    count,
                    data: BlogList,
                };
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {string} id
     * @returns {Promise < IBlogModel >}
     * @memberof BlogService
     */
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const BlogFind = yield model_1.default.findOne({
                    _id: mongoose_1.Types.ObjectId(id)
                });
                const Blog = JSON.parse(JSON.stringify(BlogFind));
                Blog.author = yield service_2.default.findOne(Blog.author);
                Blog.classifications = yield service_1.default.findOne(Blog.classifications);
                return Blog;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
    * @param {string} id
    * @returns {Promise < IBlogModel >}
    * @memberof BlogService
    */
    update(id, updateInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const BlogFind = yield model_1.default.updateOne({
                    _id: mongoose_1.Types.ObjectId(id)
                }, updateInfo);
                console.log(BlogFind, updateInfo);
                return BlogFind;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {IBlogModel} Blog
     * @returns {Promise < IBlogModel >}
     * @memberof BlogService
     */
    insert(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                body.createdAt = new Date();
                body.updatedAt = new Date();
                const Blog = yield model_1.default.create(body);
                return Blog;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {string} id
     * @returns {Promise < IBlogModel >}
     * @memberof BlogService
     */
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Blog = yield model_1.default.findOneAndRemove({
                    _id: mongoose_1.Types.ObjectId(id)
                });
                return Blog;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
};
exports.default = BlogService;
//# sourceMappingURL=service.js.map