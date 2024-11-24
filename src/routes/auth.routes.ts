import { Router } from 'express';
import { loginUser, registerUser } from '../handlers/auth.handlers';
import validationMiddleware from '../middlewares/validation.middleware';
import { loginUserDto, registerUserDto } from '../types/users.types';

const router = Router();

router.post('/register', validationMiddleware(registerUserDto), registerUser);
router.post('/login', validationMiddleware(loginUserDto), loginUser);
export default router;
