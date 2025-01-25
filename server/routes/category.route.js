import {Router} from 'express'
import auth from '../middleware/auth.js'
import { AddCategoryController, DeleteCategoryController, getCategoryController, updateCategoryController } from '../controllers/Category.controller.js';

const categoryRouter = Router();


categoryRouter.post('/add-category',auth,AddCategoryController)
categoryRouter.get('/get',getCategoryController);
categoryRouter.put('/update',auth,updateCategoryController);
categoryRouter.delete('/delete',auth,DeleteCategoryController);

export default categoryRouter;