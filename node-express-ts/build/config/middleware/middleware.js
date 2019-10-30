"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const passport = require("passport");
const session = require("express-session");
const index_1 = require("../env/index");
const mongo = require("connect-mongo");
const index_2 = require("../error/index");
const sendHttpError_1 = require("../error/sendHttpError");
const ejs = require('ejs');
const flash_1 = require("./flash");
const MongoStore = mongo(session);
/**
 * @export
 * @param {express.Application} app
 */
function configure(app) {
    // express middleware
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
    app.use(cookieParser());
    // returns the compression middleware
    app.use(compression());
    // helps you secure your Express apps by setting various HTTP headers
    app.use(helmet());
    // providing a Connect/Express middleware that can be used to enable CORS with various options
    app.use(cors());
    /**
     * @swagger
     * components:
     *  securitySchemes:
     *    cookieAuth:
     *      type: apiKey
     *      in: cookie
     *      name: sid
     */
    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: index_1.default.secret,
        name: 'api.sid',
        store: new MongoStore({
            url: `${index_1.default.database.MONGODB_URI}${index_1.default.database.MONGODB_DB_MAIN}`,
            autoReconnect: true
        })
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    // custom errors
    app.use(sendHttpError_1.sendHttpErrorModule);
    // cors
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,' +
            ' Content-Type, Accept,' +
            ' Authorization,' +
            ' Access-Control-Allow-Credentials');
        res.header('Access-Control-Allow-Credentials', 'true');
        next();
    });
    app.use(flash_1.flash());
    app.set('view engine', 'ejs');
    app.set('view engine', 'html');
    app.engine('html', require('ejs-mate'));
    app.locals._layoutFile = 'layout.html';
    app.use(express.static('public'));
}
exports.configure = configure;
/**
 * @export
 * @param {express.Application} app
 */
function initErrorHandler(app) {
    app.use((error, req, res, next) => {
        if (typeof error === 'number') {
            error = new index_2.HttpError(error); // next(404)
        }
        if (error instanceof index_2.HttpError) {
            res.sendHttpError(error);
        }
        else {
            if (app.get('env') === 'development') {
                error = new index_2.HttpError(500, error.message);
                res.sendHttpError(error);
            }
            else {
                error = new index_2.HttpError(500);
                res.sendHttpError(error, error.message);
            }
        }
        console.error(error);
    });
}
exports.initErrorHandler = initErrorHandler;
//# sourceMappingURL=middleware.js.map