import { z } from 'zod';

export const signUpRequestSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters' })
    .max(100, { message: 'Name must not exceed 100 characters' })
    .default(''),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(50, { message: 'Username must not exceed 50 characters' })
    .regex(/^[A-Za-z0-9_]+$/, {
      message: 'Username can only contain letters, numbers, and underscores',
    })
    .default(''),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(100, { message: 'Password must not exceed 100 characters' })
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Must contain at least one symbol')
    .default(''),
});
