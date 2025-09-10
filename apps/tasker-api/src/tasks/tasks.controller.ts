import {Router} from 'express';
import { getAllTasks } from './tasks.service';

const router = Router();

router.get('/',getAllTasks);


export default router;
