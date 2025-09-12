import {Router} from 'express';
import { createTask, deleteTask, getAllTasks, updateTask } from './tasks.service';
import { authMiddleware } from '../auth';

const router = Router();
router.use(authMiddleware);
router.get('/',getAllTasks);
router.post('/',createTask);
router.patch('/:id',updateTask);
router.delete('/:id',deleteTask);

export default router;
