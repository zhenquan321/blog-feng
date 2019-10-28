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
const validation_1 = require("./validation");
const mongoose_1 = require("mongoose");
/**
 * @export
 * @implements {IUserModelService}
 */
const UserService = {
    /**
     * @returns {Promise < IUserModel[] >}
     * @memberof UserService
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
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = validation_1.default.getUser({
                    id
                });
                if (validate.error) {
                    throw new Error(validate.error.message);
                }
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
     * @param {IUserModel} user
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
    insert(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = validation_1.default.createUser(body);
                if (validate.error) {
                    throw new Error(validate.error.message);
                }
                const user = yield model_1.default.create(body);
                return user;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {string} id
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = validation_1.default.removeUser({
                    id
                });
                if (validate.error) {
                    throw new Error(validate.error.message);
                }
                const user = yield model_1.default.findOneAndRemove({
                    _id: mongoose_1.Types.ObjectId(id)
                });
                return user;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
};
exports.default = UserService;
//# sourceMappingURL=service.js.map