import { z } from 'zod';

export const updateUserNameRequestSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters' })
    .max(100, { message: 'Name must not exceed 100 characters' }),
});
