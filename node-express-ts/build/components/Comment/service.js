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
const service_1 = require("../User/service");
const Time_1 = require("../../utils/Time");
const CommentService = {
    /**
     * @returns {Promise < ICommentModel[] >}
     * @memberof CommentService
     */
    findAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = query && query.page ? Number(query.page) : 0;
                const pageSize = query && query.pageSize ? Number(query.pageSize) : 10;
                const findKeyObj = {
                    subjectId: query.subjectId,
                    deleted: false
                };
                const commentList = yield model_1.default.find(findKeyObj).sort({ updatedAt: -1 }).limit(pageSize).skip(page * pageSize);
                const count = yield model_1.default.find(findKeyObj).countDocuments();
                const commentListRt = JSON.parse(JSON.stringify(commentList));
                for (let i = 0; i < commentListRt.length; i++) {
                    commentListRt[i].author = yield service_1.default.findOne(commentListRt[i].userId);
                    commentListRt[i].createdAt = new Time_1.default().formatDate(commentListRt[i].createdAt);
                    commentListRt[i].updatedAt = new Time_1.default().formatDate(commentListRt[i].updatedAt);
                }
                return {
                    count,
                    data: commentListRt,
                };
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {string} id
     * @returns {Promise < ICommentModel >}
     * @memberof CommentService
     */
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield model_1.default.findOne({
                    _id: mongoose_1.Types.ObjectId(id)
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {ICommentModel} Comment
     * @returns {Promise < ICommentModel >}
     * @memberof CommentService
     */
    insert(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                body.createdAt = new Date();
                const Comment = yield model_1.default.create(body);
                return Comment;
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
     * @param {string} id
     * @returns {Promise < ICommentModel >}
     * @memberof CommentService
     */
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Comment = yield model_1.default.findOneAndRemove({
                    _id: mongoose_1.Types.ObjectId(id)
                });
                return Comment;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    count(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield model_1.default.find({ subjectId: id }).count();
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
};
exports.default = CommentService;
//# sourceMappingURL=service.js.map