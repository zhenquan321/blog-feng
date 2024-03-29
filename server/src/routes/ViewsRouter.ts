import { ViewsComponent } from '../components';
import { Router } from 'express';


/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * 博客板块
 * .列表
 * .详情
 */
router.get('/', ViewsComponent.index); 
router.get('/blog/:id', ViewsComponent.blogItem);
router.get('/blogCreate', ViewsComponent.blogCreate);

/**
 * 用户板块
 * .用户详情
 */
router.get('/userInfo/:id', ViewsComponent.userInfo);

/**
 * 电影版块
 * .列表
 * .详情
 */
router.get('/movie', ViewsComponent.movie);
router.get('/movieItem/:id', ViewsComponent.movieItem);


router.get('/handBook', ViewsComponent.handBook);
router.get('/createHandBook', ViewsComponent.createHandBook);

router.get('/viewHandBook', ViewsComponent.viewHandBook);
/**
 * @export {express.Router}
 */
export default router;
