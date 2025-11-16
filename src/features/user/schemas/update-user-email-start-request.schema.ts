import { z } from 'zod';

export const updateUserEmailStartRequestSchema = z.object({
  email: z.email(),
});
