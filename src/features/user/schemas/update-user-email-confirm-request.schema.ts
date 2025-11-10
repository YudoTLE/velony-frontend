import { z } from 'zod';

export const updateUserEmailConfirmRequestSchema = z.object({
  otp: z.string().default(''),
});
