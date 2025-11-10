import { z } from 'zod';

export const errorSchema = z.object({
  messages: z.array(z.string()),
  status: z.int(),
  data: z.unknown(),
});
