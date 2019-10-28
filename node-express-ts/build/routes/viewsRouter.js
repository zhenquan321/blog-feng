"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("../components");
const express_1 = require("express");
/**
 * @constant {express.Router}
 */
const router = express_1.Router();
router.get('/', components_1.viewsComponent.index);
/**
 * @export {express.Router}
 */
exports.default = router;
//# sourceMappingURL=viewsRouter.js.map