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
const http = require("http");
const passport = require("passport");
const passportLocal = require("passport-local");
const error_1 = require("../error");
const model_1 = require("../../components/User/model");
const LocalStrategy = passportLocal.Strategy;
/**
 * @description
 * determines, which data of the user object should be stored in the session.
 * The result of the serializeUser method is attached to the session
 * as req.session.passport.user = {}
 */
passport.serializeUser((user, done) => {
    done(undefined, user.id);
});
/**
 * @description
 * checks if user exists in database
 * if everything ok, proceed to route
 */
passport.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield model_1.default.findById(id);
        done(null, user);
    }
    catch (error) {
        done(error);
    }
}));
/**
 * @description
 * configuring new local strategy
 * and use it in passport
 */
passport.use(new LocalStrategy({
    usernameField: 'email'
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield model_1.default.findOne({
            email: email.toLowerCase()
        });
        if (!user) {
            return done(undefined, false, {
                message: `Email ${email} not found.`
            });
        }
        const isMatched = yield user.comparePassword(password);
        if (isMatched) {
            return done(undefined, user);
        }
        return done(undefined, false, {
            message: 'Invalid email or password.'
        });
    }
    catch (error) {
        done(error);
    }
})));
/**
 * @description Login Required middleware.
 */
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    next(new error_1.default(401, http.STATUS_CODES[401]));
}
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=passport.js.map