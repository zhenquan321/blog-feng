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
/**
 * @export
 * @implements {MovieReptileService}
 */
exports.MovieReptileService = {
    insert(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const validate: Joi.ValidationResult < MovieModel > = UserValidation.createUser(body);
                // if (validate.error) {
                //     throw new Error(validate.error.message);
                // }
                let hsmovie = yield this.findOne(body.name);
                if (hsmovie && hsmovie.name) {
                    console.log("该电影已存在");
                }
                else {
                    const Movie = yield model_1.MovieModel.create(body);
                    return Movie;
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    findOne(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.MovieModel.findOne({
                name: name
            });
        });
    },
};
/**
 * @export
 * @implements {JobReptileService}
 */
exports.JobReptileService = {
    insert(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let hsmovie = yield this.findOne(body.id);
                if (hsmovie && hsmovie.id) {
                    console.log("该job已存在");
                }
                else {
                    const Job = yield model_1.JobModel.create(body);
                    return Job;
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model_1.JobModel.findOne({
                id: id
            });
        });
    },
};
//# sourceMappingURL=service.js.map