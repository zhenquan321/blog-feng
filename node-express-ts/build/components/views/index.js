"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction}next
 * @param {IUserModel} user
 * @param {string} resMessage
 */
function index(req, res, next) {
    res.render('index', { title: 'hello world' });
}
exports.index = index;
//# sourceMappingURL=index.js.map