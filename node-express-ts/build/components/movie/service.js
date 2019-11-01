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
 * @implements {IMovieModelService}
 */
const MovieService = {
    /**
     * @param {IMovieModel} user
     * @returns {Promise < IMovieModel >}
     * @memberof UserService
     */
    insert(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const validate: Joi.ValidationResult < MovieModel > = UserValidation.createUser(body);
                // if (validate.error) {
                //     throw new Error(validate.error.message);
                // }
                const hsmovie = yield this.findOneByName(body.name);
                if (hsmovie && hsmovie.name) {
                    // console.log('该电影已存在');
                    const Movie = yield model_1.default.update({ name: body.name }, body);
                }
                else {
                    const Movie = yield model_1.default.create(body);
                    return Movie;
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
     * @returns {Promise < IMovieModel >}
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
        * @returns {Promise < IMovieModel[] >}
        * @memberof UserService
        */
    findAll(pageQurey) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = pageQurey && pageQurey.page ? Number(pageQurey.page) : 0;
            const pagesize = pageQurey && pageQurey.pagesize ? Number(pageQurey.pagesize) : 20;
            try {
                const findKeyObj = {};
                if (pageQurey && pageQurey.year) {
                    findKeyObj.years = Number(pageQurey.year);
                }
                if (pageQurey && pageQurey.type) {
                    findKeyObj.type = pageQurey.type;
                }
                const movieList = yield model_1.default.find(findKeyObj).limit(pagesize).skip(page * pagesize);
                const count = yield model_1.default.find(findKeyObj).countDocuments();
                return {
                    count,
                    data: movieList,
                };
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    update(qurey, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateInfo = yield model_1.default.updateOne(qurey, { $set: body });
                console.log(updateInfo);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    getCount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield model_1.default.find().countDocuments();
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {string} id
     * @returns {Promise < IMovieModel >}
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
exports.default = MovieService;
//# sourceMappingURL=service.js.map