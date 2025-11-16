import { z } from 'zod';

export const updateUserUsernameResponseSchema = z.object({
  username: z.string(),
});
