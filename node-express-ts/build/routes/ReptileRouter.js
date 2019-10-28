"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("../components");
const express_1 = require("express");
/**
 * @constant {express.Router}
 */
const router = express_1.Router();
router.get('/movieRt', components_1.ReptileComponent.movieRt);
router.get('/jobRt', components_1.ReptileComponent.jobRt);
/**
 * @export {express.Router}
 */
exports.default = router;
//# sourceMappingURL=ReptileRouter.js.map