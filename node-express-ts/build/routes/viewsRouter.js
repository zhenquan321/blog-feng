"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("../components");
const express_1 = require("express");
/**
 * @constant {express.Router}
 */
const router = express_1.Router();
/**
 * 博客板块
 * .列表
 * .详情
 */
router.get('/', components_1.ViewsComponent.blog);
router.get('/blog/:id', components_1.ViewsComponent.blogItem);
/**
 * 用户板块
 * .用户详情
 */
router.get('/userInfo/:id', components_1.ViewsComponent.userInfo);
/**
 * 电影版块
 * .列表
 * .详情
 */
router.get('/movie', components_1.ViewsComponent.movie);
router.get('/movieItem/:id', components_1.ViewsComponent.movieItem);
router.get('/careerInformation', components_1.ViewsComponent.careerInformation);
/**
 * @export {express.Router}
 */
exports.default = router;
//# sourceMappingURL=viewsRouter.js.map