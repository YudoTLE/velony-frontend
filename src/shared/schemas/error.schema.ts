import { z } from 'zod';

export const errorSchema = z.object({
  statusCode: z.int(),
  message: z.string(),
  error: z.string().optional(),
  errors: z.record(z.string(), z.array(z.string())).optional(),
});
