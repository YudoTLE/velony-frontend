import { z } from 'zod';

export const updateUserNameResponseSchema = z.object({
  name: z.string(),
});
