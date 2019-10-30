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
 * @implements {IJobModelService}
 */
const JobService = {
    /**
     * @param {IJobModel} user
     * @returns {Promise < IJobModel >}
     * @memberof UserService
     */
    insert(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const validate: Joi.ValidationResult < JobModel > = UserValidation.createUser(body);
                // if (validate.error) {
                //     throw new Error(validate.error.message);
                // }
                const hsJob = yield this.findOneByName(body.name);
                if (hsJob && hsJob.name) {
                    // console.log('该电影已存在');
                    const Job = yield model_1.default.update({ name: body.name }, body);
                }
                else {
                    const Job = yield model_1.default.create(body);
                    return Job;
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    findOneByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.default.findOne({
                name
            });
        });
    },
    /*
     * @param {string} id
     * @returns {Promise < IJobModel >}
     * @memberof UserService
     */
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const validate: Joi.ValidationResult<{
                //     id: string
                // }> = UserValidation.getUser({
                //     id
                // });
                // if (validate.error) {
                //     throw new Error(validate.error.message);
                // }
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
        * @returns {Promise < IJobModel[] >}
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
     * @returns {Promise < IJobModel >}
     * @memberof UserService
     */
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const validate: Joi.ValidationResult<{
                //     id: string
                // }> = UserValidation.removeUser({
                //     id
                // });
                // if (validate.error) {
                //     throw new Error(validate.error.message);
                // }
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
exports.default = JobService;
//# sourceMappingURL=service.js.map