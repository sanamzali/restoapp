import { z } from 'zod';
import { objectIdSchema } from './zod.types';
import { companySchema } from './companies.types';

export const branchSchema = z.object({
  _id: objectIdSchema.optional(),
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  company: objectIdSchema.or(companySchema),
});

export type Branch = z.infer<typeof branchSchema>;

export const createBranchDto = branchSchema
  .pick({
    name: true,
    address: true,
    phone: true,
    company: true,
  })
  .strict();

export type CreateBranchDto = z.infer<typeof createBranchDto>;

export const updateBranchDto = branchSchema
  .pick({
    name: true,
    address: true,
  })
  .strict();

export type UpdateBranchDto = z.infer<typeof updateBranchDto>;
