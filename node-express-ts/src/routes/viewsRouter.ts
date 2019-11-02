import { viewsComponent } from '../components';
import { Router } from 'express';


/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.get('/', viewsComponent.movie); // .index
router.get('/userInfo/:id', viewsComponent.userInfo);
router.get('/movie', viewsComponent.movie);
router.get('/movieItem/:id', viewsComponent.movieItem);
router.get('/careerInformation', viewsComponent.careerInformation);


/**
 * @export {express.Router}
 */
export default router;
