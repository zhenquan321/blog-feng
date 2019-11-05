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
const passport = require("passport");
const service_1 = require("./service");
const error_1 = require("../../config/error");
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction}next
 * @param {IUserModel} user
 * @param {string} resMessage
 */
function passportRequestLogin(req, res, next, user, resMessage) {
    return req.logIn(user, (err) => {
        if (err)
            return next(new error_1.default(err));
        // res.json({
        //     status: 200,
        //     logged: true,
        //     message: resMessage
        // });
        req.session.user = {
            _id: user._id,
            email: user.email,
            isAdmin: (user.isAdmin || false),
            profile: user.profile
        };
        req.flash = { success: '登录成功' };
        res.redirect('/');
    });
}
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function signup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield service_1.default.createUser(req.body);
            passportRequestLogin(req, res, next, user, 'Sign in successfull');
        }
        catch (error) {
            if (error.code === 500) {
                return next(new error_1.default(error.message.status, error.message));
            }
            res.json({
                status: 400,
                message: error.message
            });
        }
    });
}
exports.signup = signup;
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        passport.authenticate('local', (err, user) => {
            if (err) {
                return next(new error_1.default(400, err.message));
            }
            if (!user) {
                return res.json({
                    status: 401,
                    logged: false,
                    message: 'Invalid credentials!'
                });
            }
            passportRequestLogin(req, res, next, user, 'Sign in successfull');
        })(req, res, next);
    });
}
exports.login = login;
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function signout(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.user) {
            res.json({
                status: 401,
                logged: false,
                message: 'You are not authorized to app. Can\'t logout'
            });
        }
        if (req.user) {
            req.logout();
            // res.json({
            //     status: 200,
            //     logged: false,
            //     message: 'Successfuly logged out!'
            // });
            req.session.user = '';
            req.flash = { success: '退出成功~' };
            res.redirect('/');
        }
    });
}
exports.signout = signout;
//# sourceMappingURL=index.js.map