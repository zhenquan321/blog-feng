"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("../components");
const express_1 = require("express");
/**
 * @constant {express.Router}
 */
const router = express_1.Router();
router.get('/', components_1.viewsComponent.movie); // .index
router.get('/userInfo/:id', components_1.viewsComponent.userInfo);
router.get('/movie', components_1.viewsComponent.movie);
router.get('/movieItem/:id', components_1.viewsComponent.movieItem);
router.get('/careerInformation', components_1.viewsComponent.careerInformation);
/**
 * @export {express.Router}
 */
exports.default = router;
//# sourceMappingURL=viewsRouter.js.map