import { z } from 'zod';

export const updateUserEmailConfirmResponseSchema = z.object({
  email: z.email(),
});
