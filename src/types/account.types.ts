import { z } from 'zod';
import { objectIdSchema } from './zod.types';

export enum AccountTypes {
  FREE = 'free',
  PREMIUM = 'premium',
}

export const accountSchema = z.object({
  _id: objectIdSchema.optional(),
  accountType: z.nativeEnum(AccountTypes),
  active: z.boolean().default(true),
});

export type Account = z.infer<typeof accountSchema>;
