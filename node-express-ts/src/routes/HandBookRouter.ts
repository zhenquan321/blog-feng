import { Router } from 'express';
import { HandBookComponent } from '../components';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * GET method route
 * @example http://localhost:PORT/v1/HandBooks
 * 
 * @swagger
 * /v1/HandBooks:
 *   get:
 *     description: Get all stored HandBooks in Database
 *     tags: ["HandBooks"]
 *     security:
 *      - cookieAuth: []
 *     responses:
 *       200:
 *         description: An array of HandBooks
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/HandBooks'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.get('/', HandBookComponent.findAll);

/**
 * POST method route
 * @example http://localhost:PORT/v1/HandBooks
 * 
 * @swagger
 * /v1/HandBooks:
 *   post:
 *      description: Create new HandBook
 *      tags: ["HandBooks"]
 *      security:
 *       - cookieAuth: []
 *      requestBody:
 *        description: HandBook creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/HandBookSchema'
 *            example:
 *              name: HandBookName
 *              email: test.HandBook@mail.com
 *      responses:
 *        201:
 *          description: return created HandBook
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/HandBookSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post('/', HandBookComponent.create);

/**
 * GET method route 
 * @example http://localhost:PORT/v1/HandBooks/:id
 * 
 * @swagger
 * /v1/HandBooks/{id}:
 *  get:
 *    description: Get HandBook by HandBookId
 *    tags: ["HandBooks"]
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique HandBookId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return HandBook by id
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/HandBookSchema'
 */
router.get('/:id', HandBookComponent.findOne);

/**
 * DELETE method route
 * @example  http://localhost:PORT/v1/HandBooks/:id
 * 
 * @swagger
 * /v1/HandBooks/{id}:
 *  delete:
 *    description: Delete HandBook by HandBookId
 *    tags: ["HandBooks"]
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique HandBookId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return deleted HandBook
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/HandBookSchema'
 */
router.delete('/:id', HandBookComponent.remove);

router.post('/update', HandBookComponent.update);

router.get('/remove/:id', HandBookComponent.remove);

router.post('/thumbsUp', HandBookComponent.thumbsUp);

/**
 * @export {express.Router}
 */
export default router;
