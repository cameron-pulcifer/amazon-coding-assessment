import { Router } from 'express';
import categoryRoutes from './categoryRoutes';
import healthRoutes from './healthRoutes';
import todosRoutes from './todoRoutes';

const router = Router();

router.use('/categories', categoryRoutes);
router.use('/health', healthRoutes);
router.use('/todos', todosRoutes);

export default router;
