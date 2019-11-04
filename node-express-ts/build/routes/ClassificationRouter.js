"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const components_1 = require("../components");
/**
 * @constant {express.Router}
 */
const router = express_1.Router();
/**
 * GET method route
 * @example http://localhost:PORT/v1/Classifications
 *
 * @swagger
 * /v1/Classifications:
 *   get:
 *     description: Get all stored Classifications in Database
 *     tags: ["Classifications"]
 *     security:
 *      - cookieAuth: []
 *     responses:
 *       200:
 *         description: An array of Classifications
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/Classifications'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.get('/', components_1.ClassificationComponent.findAll);
/**
 * POST method route
 * @example http://localhost:PORT/v1/Classifications
 *
 * @swagger
 * /v1/Classifications:
 *   post:
 *      description: Create new Classification
 *      tags: ["Classifications"]
 *      security:
 *       - cookieAuth: []
 *      requestBody:
 *        description: Classification creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ClassificationSchema'
 *            example:
 *              name: ClassificationName
 *              email: test.Classification@mail.com
 *      responses:
 *        201:
 *          description: return created Classification
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/ClassificationSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post('/', components_1.ClassificationComponent.create);
/**
 * GET method route
 * @example http://localhost:PORT/v1/Classifications/:id
 *
 * @swagger
 * /v1/Classifications/{id}:
 *  get:
 *    description: Get Classification by ClassificationId
 *    tags: ["Classifications"]
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique ClassificationId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return Classification by id
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/ClassificationSchema'
 */
router.get('/:id', components_1.ClassificationComponent.findOne);
/**
 * DELETE method route
 * @example  http://localhost:PORT/v1/Classifications/:id
 *
 * @swagger
 * /v1/Classifications/{id}:
 *  delete:
 *    description: Delete Classification by ClassificationId
 *    tags: ["Classifications"]
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique ClassificationId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return deleted Classification
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/ClassificationSchema'
 */
router.delete('/:id', components_1.ClassificationComponent.remove);
/**
 * @export {express.Router}
 */
exports.default = router;
//# sourceMappingURL=ClassificationRouter.js.map