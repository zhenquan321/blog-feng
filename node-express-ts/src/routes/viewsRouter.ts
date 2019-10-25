import { viewsComponent } from '../components';
import { Router } from 'express';


/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.get('/', viewsComponent.index);


/**
 * @export {express.Router}
 */
export default router;
