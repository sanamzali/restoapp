import { Request, Response } from 'express';
import { login, register } from '../services/users.service';

export const registerUser = async (req: Request, res: Response) => {
  const user = await register(req.body);
  res.json(user);
};

export const loginUser = async (req: Request, res: Response) => {
  const jwtPayload = await login(req.body);
  res.json(jwtPayload);
};
