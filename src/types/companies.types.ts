import { z } from 'zod';
import { objectIdSchema } from './zod.types';
import { userPayload } from './users.types';

export const companySchema = z.object({
  _id: objectIdSchema.optional(),
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string().email(),
  website: z.string().url().optional(),
  user: objectIdSchema.or(userPayload),
  account: objectIdSchema,
});

export type Company = z.infer<typeof companySchema>;

export const createCompanyDto = companySchema
  .pick({
    name: true,
    address: true,
    phone: true,
    email: true,
  })
  .strict();

export const updateCompanyDto = companySchema
  .pick({
    name: true,
    address: true,
    phone: true,
  })
  .strict();

export type CreateCompanyDto = z.infer<typeof createCompanyDto>;
