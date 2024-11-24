import { Router } from 'express';
import {
  createUser,
  getUserById,
  getUsers,
  loginUser,
  registerUser,
} from '../handlers/users.handler';
import validationMiddleware from '../middlewares/validation.middleware';
import { loginUserDto, registerUserDto } from '../types/users.types';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', validationMiddleware(registerUserDto), createUser);
router.post('/register', validationMiddleware(registerUserDto), registerUser);
router.post('/login', validationMiddleware(loginUserDto), loginUser);

export default router;
