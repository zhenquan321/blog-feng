import * as express from 'express';
import * as http from 'http';
import * as passportConfig from '../config/middleware/passport';
import * as swaggerUi from 'swagger-ui-express';
import AuthRouter from './AuthRouter';
import UserRouter from './UserRouter';
import ReptileRouter from './ReptileRouter';
import ViewsRouter from './ViewsRouter';
import ToolRouter from './ToolRouter';
import BlogRouter from './BlogRouter';
import CommentRouter from './CommentRouter';
import ClassificationRouter from './ClassificationRouter';
import MovieRouter from './MovieRouter';
import HandBookRouter from './HandBookRouter';



let swaggerDoc: Object;

try {
    swaggerDoc = require('../../swagger.json');
} catch (error) {
    console.log('***************************************************');
    console.log('  Seems like you doesn\`t have swagger.json file');
    console.log('  Please, run: ');
    console.log('  $ swagger-jsdoc -d swaggerDef.js -o swagger.json');
    console.log('***************************************************');
}

/**
 * @export
 * @param {express.Application} app
 */
export function init(app: express.Application): void {
    const router: express.Router = express.Router();

    app.use('/', ViewsRouter);
    /**
     * @description
     *  Forwards any requests to the /v1/users URI to our UserRouter
     *  Also, check if user authenticated
     * @constructs
     */
    app.use('/v1/users', passportConfig.isAuthenticated, UserRouter);

    /**
     * @description Forwards any requests to the /auth URI to our AuthRouter
     * @constructs
     */
    app.use('/auth', AuthRouter);

     /**
     * @description
     * 爬虫
     * @constructs
     */
    
    app.use('/reptile', ReptileRouter);


     /**
     * 博客分类
     */
    app.use('/classification', ClassificationRouter);
   
    /**
     * 博客
     */
    app.use('/blog', BlogRouter);
   
    /**
     * 博客评论
     */
    app.use('/comment', CommentRouter);

     /**
     * 工具类接口
     */
    app.use('/tool', ToolRouter);

     /**
     * 电影接口
     */
    app.use('/movie', MovieRouter);

    app.use('/api/handBook', HandBookRouter);

     /**
     * 小程序使用
     * movie web 接口地址冲突
     */
    app.use('/api/movie', MovieRouter);
    app.use('/api/blog', BlogRouter);
    /**
     * @description
     *  If swagger.json file exists in root folder, shows swagger api description
     *  else send commands, how to get swagger.json file
     * @constructs
     */
    if (swaggerDoc) {
        app.use('/docs', swaggerUi.serve);
        app.get('/docs', swaggerUi.setup(swaggerDoc));
    } else {
        app.get('/docs', (req, res) => {
            res.send('<p>Seems like you doesn\'t have <code>swagger.json</code> file.</p>' +
                '<p>For generate doc file use: <code>swagger-jsdoc -d swaggerDef.js -o swagger.json</code> in terminal</p>' +
                '<p>Then, restart your application</p>');
        });
    }

    /** 
     * @description No results returned mean the object is not found
     * @constructs
     */
    app.use((req, res, next) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });

    /**
     * @constructs all routes
     */
    app.use(router);
}
