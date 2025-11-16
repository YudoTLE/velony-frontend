import { z } from 'zod';

export const updateUserUsernameRequestSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(50, { message: 'Username must not exceed 50 characters' })
    .regex(/^[A-Za-z0-9_]+$/, {
      message: 'Username can only contain letters, numbers, and underscores',
    })
    .default(''),
});
