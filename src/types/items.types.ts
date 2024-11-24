import { z } from 'zod';
import { objectIdSchema } from './zod.types';
import { companySchema } from './companies.types';

export const itemSchema = z.object({
  _id: objectIdSchema.optional(),
  name: z.string(),
  description: z.string(),
  ingredients: z.array(z.string()),
  price: z.number(),
  company: objectIdSchema.or(companySchema),
});

export type Item = z.infer<typeof itemSchema>;

export const createItemDto = itemSchema
  .pick({
    name: true,
    description: true,
    ingredients: true,
    price: true,
    company: true,
  })
  .strict();

export type CreateItemDto = z.infer<typeof createItemDto>;

export const updateItemDto = itemSchema
  .pick({
    name: true,
    description: true,
    ingredients: true,
    price: true,
  })
  .strict();

export type UpdateItemDto = z.infer<typeof updateItemDto>;
