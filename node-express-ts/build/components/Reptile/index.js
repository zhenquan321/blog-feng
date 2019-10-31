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
const movieReptile_1 = require("./Reptile/movieReptile");
const jobReptile_1 = require("./Reptile/jobReptile");
/**
 * @export
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function movieRt(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        movieReptile_1.movieReptile();
        res.status(200).json({
            status: 200,
            message: '已开始抓取电影~'
        });
    });
}
exports.movieRt = movieRt;
/**
 * @export
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function jobRt(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        jobReptile_1.jobReptile();
        res.status(200).json({
            status: 200,
            message: '已开始抓取招聘信息~'
        });
    });
}
exports.jobRt = jobRt;
//# sourceMappingURL=index.js.map