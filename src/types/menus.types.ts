import { z } from 'zod';
import { objectIdSchema } from './zod.types';
import { branchSchema } from './branch.types';

const sectionSchema = z.object({
  _id: objectIdSchema.optional(),
  name: z.string(),
  items: z.array(
    z.object({
      item: objectIdSchema,
      itemIndex: z.number(),
    })
  ),
  sectionIndex: z.number(),
});

export const menuSchema = z.object({
  _id: objectIdSchema.optional(),
  name: z.string(),
  description: z.string(),
  sections: z.array(sectionSchema),
  branch: objectIdSchema.or(branchSchema),
});

export type Menu = z.infer<typeof menuSchema>;

export const createMenuDto = menuSchema
  .pick({
    name: true,
    description: true,
    branch: true,
    sections: true,
  })
  .strict();

export type CreateMenuDto = z.infer<typeof createMenuDto>;

export const updateMenuDto = menuSchema
  .pick({
    name: true,
    description: true,
    sections: true,
  })
  .strict();

export type UpdateMenuDto = z.infer<typeof updateMenuDto>;
