import { z } from 'zod';

export const updateUserPasswordRequestSchema = z.object({
  oldPassword: z.string().min(1, 'Old password is required').default(''),

  newPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(100, { message: 'Password must not exceed 100 characters' })
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Must contain at least one symbol')
    .default(''),
});
