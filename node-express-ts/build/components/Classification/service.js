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
const ClassificationService = {
    /**
     * @returns {Promise < IClassificationModel[] >}
     * @memberof ClassificationService
     */
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield model_1.default.find({});
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
     * @param {IClassificationModel} Classification
     * @returns {Promise < IClassificationModel >}
     * @memberof ClassificationService
     */
    insert(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hasClassification = yield model_1.default.findOne({ name: body.name });
                if (hasClassification) {
                    return { mag: '该分类已存在' };
                }
                else {
                    const Classification = yield model_1.default.create(body);
                    return Classification;
                }
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
                const Classification = yield model_1.default.findOneAndRemove({
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
exports.default = ClassificationService;
//# sourceMappingURL=service.js.map