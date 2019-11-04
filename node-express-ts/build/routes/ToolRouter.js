"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("../components");
const express_1 = require("express");
/**
 * @constant {express.Router}
 */
const router = express_1.Router();
router.post('/upload', components_1.ToolComponent.upload);
/**
 * @export {express.Router}
 */
exports.default = router;
//# sourceMappingURL=ToolRouter.js.map