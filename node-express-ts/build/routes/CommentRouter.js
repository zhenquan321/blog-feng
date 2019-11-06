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
 * @example http://localhost:PORT/v1/Comments
 *
 * @swagger
 * /v1/Comments:
 *   get:
 *     description: Get all stored Comments in Database
 *     tags: ["Comments"]
 *     security:
 *      - cookieAuth: []
 *     responses:
 *       200:
 *         description: An array of Comments
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/Comments'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.get('/', components_1.CommentComponent.findAll);
/**
 * POST method route
 * @example http://localhost:PORT/v1/Comments
 *
 * @swagger
 * /v1/Comments:
 *   post:
 *      description: Create new Comment
 *      tags: ["Comments"]
 *      security:
 *       - cookieAuth: []
 *      requestBody:
 *        description: Comment creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CommentSchema'
 *            example:
 *              name: CommentName
 *              email: test.Comment@mail.com
 *      responses:
 *        201:
 *          description: return created Comment
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/CommentSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post('/', components_1.CommentComponent.create);
/**
 * GET method route
 * @example http://localhost:PORT/v1/Comments/:id
 *
 * @swagger
 * /v1/Comments/{id}:
 *  get:
 *    description: Get Comment by CommentId
 *    tags: ["Comments"]
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique CommentId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return Comment by id
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/CommentSchema'
 */
router.get('/:id', components_1.CommentComponent.findOne);
/**
 * DELETE method route
 * @example  http://localhost:PORT/v1/Comments/:id
 *
 * @swagger
 * /v1/Comments/{id}:
 *  delete:
 *    description: Delete Comment by CommentId
 *    tags: ["Comments"]
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique CommentId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return deleted Comment
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/CommentSchema'
 */
router.delete('/:id', components_1.CommentComponent.remove);
/**
 * @export {express.Router}
 */
exports.default = router;
//# sourceMappingURL=CommentRouter.js.map