import { Router } from 'express';

import ctrl from '../controllers/categoryController';
import validationMiddleware from '../middleware/validationMiddleware';
import { AddCategorySchema } from './dto/AddCategorySchema';
import { CategorySchema } from './dto/CategorySchema';
import { IdParamSchema } from './dto/IdParamSchema';

const router = Router();

router.get('/', ctrl.getAllCategories);
router.get('/:id', validationMiddleware({ params: IdParamSchema }), ctrl.getCategoryById);
router.post('/', validationMiddleware({ body: AddCategorySchema }), ctrl.addCategory);
router.put('/:id', validationMiddleware({ body: CategorySchema, params: IdParamSchema }), ctrl.updateCategory);
router.delete('/:id', validationMiddleware({ params: IdParamSchema }), ctrl.removeCategory);

export default router;
