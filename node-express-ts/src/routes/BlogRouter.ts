import { Router } from 'express';
import { BlogComponent } from '../components';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * GET method route
 * @example http://localhost:PORT/v1/Blogs
 * 
 * @swagger
 * /v1/Blogs:
 *   get:
 *     description: Get all stored Blogs in Database
 *     tags: ["Blogs"]
 *     security:
 *      - cookieAuth: []
 *     responses:
 *       200:
 *         description: An array of Blogs
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/Blogs'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.get('/', BlogComponent.findAll);

/**
 * POST method route
 * @example http://localhost:PORT/v1/Blogs
 * 
 * @swagger
 * /v1/Blogs:
 *   post:
 *      description: Create new Blog
 *      tags: ["Blogs"]
 *      security:
 *       - cookieAuth: []
 *      requestBody:
 *        description: Blog creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BlogSchema'
 *            example:
 *              name: BlogName
 *              email: test.Blog@mail.com
 *      responses:
 *        201:
 *          description: return created Blog
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/BlogSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post('/', BlogComponent.create);

/**
 * GET method route 
 * @example http://localhost:PORT/v1/Blogs/:id
 * 
 * @swagger
 * /v1/Blogs/{id}:
 *  get:
 *    description: Get Blog by BlogId
 *    tags: ["Blogs"]
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique BlogId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return Blog by id
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/BlogSchema'
 */
router.get('/:id', BlogComponent.findOne);

/**
 * DELETE method route
 * @example  http://localhost:PORT/v1/Blogs/:id
 * 
 * @swagger
 * /v1/Blogs/{id}:
 *  delete:
 *    description: Delete Blog by BlogId
 *    tags: ["Blogs"]
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique BlogId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return deleted Blog
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/BlogSchema'
 */
router.delete('/:id', BlogComponent.remove);


router.get('/remove/:id', BlogComponent.remove);
/**
 * @export {express.Router}
 */
export default router;
