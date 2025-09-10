import { Router } from "express";
import { login, register } from './auth.service';


const router = Router();

router.post('/login', login);
router.post('/register', register);


export default router;


