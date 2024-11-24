import { z } from 'zod';
import { objectIdSchema } from './zod.types';

export const userSchema = z.object({
  _id: objectIdSchema.optional(),
  email: z.string().email(),
  password: z.string().min(4).max(16),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  active: z.boolean().default(false),
  createdAt: z.date().optional(),
  updateAt: z.date().optional(),
  account: objectIdSchema,
});

export type User = z.infer<typeof userSchema>;

export const registerUserDto = userSchema
  .pick({
    email: true,
    password: true,
    firstName: true,
    lastName: true,
  })
  .strict();

export type RegisterUserDto = z.infer<typeof registerUserDto>;

export const loginUserDto = userSchema
  .pick({
    email: true,
    password: true,
  })
  .strict();

export type LoginUserDto = z.infer<typeof loginUserDto>;

export const userPayload = userSchema
  .pick({
    _id: true,
    email: true,
    firstName: true,
    lastName: true,
    account: true,
  })
  .extend({
    iat: z.number().optional(),
    exp: z.number().optional(),
  })
  .strict();

export type UserPayload = z.infer<typeof userPayload>;

export const jwtSchema = z.object({
  token: z.string(),
  payload: userPayload,
});

export type JwtPayload = z.infer<typeof jwtSchema>;
