import { ReptileComponent } from '../components';
import { Router } from 'express';


/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.get('/movieRt', ReptileComponent.movieRt);


router.get('/jobRt', ReptileComponent.jobRt);
/**
 * @export {express.Router}
 */
export default router;
