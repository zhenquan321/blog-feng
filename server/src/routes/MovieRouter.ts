import { Router } from 'express';
import { MovieComponent } from '../components';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * GET method route
 * @example http://localhost:PORT/v1/Movies
 * 
 * @swagger
 * /v1/Movies:
 *   get:
 *     description: Get all stored Movies in Database
 *     tags: ["Movies"]
 *     security:
 *      - cookieAuth: []
 *     responses:
 *       200:
 *         description: An array of Movies
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/Movies'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.get('/', MovieComponent.findAll);

/**
 * POST method route
 * @example http://localhost:PORT/v1/Movies
 * 
 * @swagger
 * /v1/Movies:
 *   post:
 *      description: Create new Movie
 *      tags: ["Movies"]
 *      security:
 *       - cookieAuth: []
 *      requestBody:
 *        description: Movie creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MovieSchema'
 *            example:
 *              name: MovieName
 *              email: test.Movie@mail.com
 *      responses:
 *        201:
 *          description: return created Movie
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/MovieSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post('/', MovieComponent.create);

/**
 * GET method route 
 * @example http://localhost:PORT/v1/Movies/:id
 * 
 * @swagger
 * /v1/Movies/{id}:
 *  get:
 *    description: Get Movie by MovieId
 *    tags: ["Movies"]
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique MovieId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return Movie by id
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/MovieSchema'
 */
router.get('/:id', MovieComponent.findOne);

/**
 * DELETE method route
 * @example  http://localhost:PORT/v1/Movies/:id
 * 
 * @swagger
 * /v1/Movies/{id}:
 *  delete:
 *    description: Delete Movie by MovieId
 *    tags: ["Movies"]
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique MovieId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return deleted Movie
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/MovieSchema'
 */
router.delete('/:id', MovieComponent.remove);


router.get('/remove/:id', MovieComponent.remove);

router.post('/thumbsUp', MovieComponent.thumbsUp);

/**
 * @export {express.Router}
 */
export default router;
