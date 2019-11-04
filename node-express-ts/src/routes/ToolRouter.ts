import { ToolComponent } from '../components';
import { Router } from 'express';


/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.post('/upload', ToolComponent.upload);

/**
 * @export {express.Router}
 */
export default router;
