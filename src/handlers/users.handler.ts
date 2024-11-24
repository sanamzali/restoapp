import { Request, Response } from 'express';
import userModel from '../models/user.model';

export const createUser = async (req: Request, res: Response) => {
  const user = await userModel.create(req.body);
  res.json(user);
};

export const getUsers = async (_req: Request, res: Response) => {
  const users = await userModel.find({});
  res.json(users);
};

export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  res.send('Users with id ' + id);
};

export const registerUser = (req: Request, res: Response) => {
  res.send('User register');
};

export const loginUser = (req: Request, res: Response) => {
  res.send('User login');
};
