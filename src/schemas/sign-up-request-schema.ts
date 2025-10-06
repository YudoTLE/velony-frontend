import { z } from 'zod';

export const signUpRequestSchema = z.object({
  name: z.string().min(3).max(100),
  username: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[A-Za-z0-9_]+$/, {
      message: 'Username can only contain letters, numbers, and underscores',
    }),
  password: z
    .string()
    .min(8)
    .max(100)
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Must contain at least one symbol'),
});

export type SignUpRequest = z.infer<typeof signUpRequestSchema>;
