import { Router } from 'express';
import { ClassificationComponent } from '../components';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

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
router.get('/', ClassificationComponent.findAll);

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
router.post('/', ClassificationComponent.create);

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
router.get('/:id', ClassificationComponent.findOne);

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
router.delete('/:id', ClassificationComponent.remove);

/**
 * @export {express.Router}
 */
export default router;
