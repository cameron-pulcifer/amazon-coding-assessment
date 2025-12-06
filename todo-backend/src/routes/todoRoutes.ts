import { Router } from 'express';
import ctrl from '../controllers/todoController';
import validationMiddleware from '../middleware/validationMiddleware';
import { AddTodoSchema } from './dto/AddTodoSchema';
import { IdParamSchema } from './dto/IdParamSchema';
import { PatchTodoSchema } from './dto/PatchTodoSchema';
import { TodoSearchCriteriaSchema } from './dto/TodoSearchCriteriaSchema';

const router = Router();

router.get('/', validationMiddleware({ query: TodoSearchCriteriaSchema }), ctrl.findAllTodos);
router.get('/:id', validationMiddleware({ params: IdParamSchema }), ctrl.findTodoById);
router.post('/', validationMiddleware({ body: AddTodoSchema }), ctrl.addTodo);
router.patch('/:id', validationMiddleware({ body: PatchTodoSchema, params: IdParamSchema }), ctrl.modifyTodo);
router.delete('/:id', validationMiddleware({ params: IdParamSchema }), ctrl.removeTodo);

export default router;
