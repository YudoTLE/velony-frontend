import { z } from 'zod';

export const messageSchema = z.object({
  id: z.string(),
  senderId: z.string(),
  senderName: z.string(),
  content: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Message = z.infer<typeof messageSchema>;
