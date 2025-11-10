import { z } from 'zod';

export const signInRequestSchema = z.object({
  username: z.string().min(1, 'Username is required').default(''),
  password: z.string().min(1, 'Password is required').default(''),
});
