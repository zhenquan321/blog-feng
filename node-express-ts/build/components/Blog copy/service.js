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
/**
 * @export
 * @implements {IBlogModelService}
 */
exports.BlogService = {
    /**
     * @returns {Promise < IBlogModel[] >}
     * @memberof BlogService
     */
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield model_1.BlogModel.find({});
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
                return yield model_1.BlogModel.findOne({
                    _id: mongoose_1.Types.ObjectId(id)
                });
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
                const Blog = yield model_1.BlogModel.create(body);
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
                const Blog = yield model_1.BlogModel.findOneAndRemove({
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
exports.ClassificationService = {
    /**
     * @returns {Promise < IClassificationModel[] >}
     * @memberof BlogService
     */
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield model_1.ClassificationModel.find({});
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {string} id
     * @returns {Promise < IClassificationModel >}
     * @memberof BlogService
     */
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield model_1.ClassificationModel.findOne({
                    _id: mongoose_1.Types.ObjectId(id)
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {IClassificationModel} Classification
     * @returns {Promise < IClassificationModel >}
     * @memberof ClassificationService
     */
    insert(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Classification = yield model_1.ClassificationModel.create(body);
                return Classification;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {string} id
     * @returns {Promise < IClassificationModel >}
     * @memberof ClassificationService
     */
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Classification = yield model_1.ClassificationModel.findOneAndRemove({
                    _id: mongoose_1.Types.ObjectId(id)
                });
                return Classification;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
};
//# sourceMappingURL=service.js.map