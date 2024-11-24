import { BadRequestError } from '../errors/bad-request.error';
import accountModel from '../models/account.model';
import userModel from '../models/user.model';
import bcrypt from 'bcryptjs';
import { AccountTypes } from '../types/account.types';
import {
  JwtPayload,
  LoginUserDto,
  RegisterUserDto,
} from '../types/users.types';
import { getEnv } from '../utils/env';
import jwt from 'jsonwebtoken';

export const register = async (data: RegisterUserDto) => {
  const exists = await userModel.findOne({ email: data.email });
  if (exists) {
    throw new BadRequestError('User exists!');
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const account = await accountModel.create({
    accountType: AccountTypes.FREE,
  });

  const user = await userModel.create({
    ...data,
    password: hashedPassword,
    active: true,
    account: account._id,
  });

  return user;
};

export const login = async (data: LoginUserDto) => {
  const { email, password } = data;

  const user = await userModel.findOne({ email });
  if (!user) {
    throw new BadRequestError('User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new BadRequestError('Wrong password');
  }

  const payload = {
    _id: user._id.toString(),
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    account: user.account.toString(),
  };
  const token = jwt.sign(payload, getEnv('JWT_SECRET'), {
    expiresIn: '30d',
  });
  const jwtPayload: JwtPayload = {
    token,
    payload,
  };

  return jwtPayload;
};
