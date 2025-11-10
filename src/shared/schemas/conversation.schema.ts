import { z } from 'zod';

import { messageSchema } from './message.schema';

export const conversationSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    thumbnailUrl: z.string().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    lastMessage: messageSchema.optional(),
  })
  .transform((data) => ({
    ...data,
    url: `${process.env.NEXT_PUBLIC_S3_BASE_URL}/c/${data.id}`,
  }));

export type Conversation = z.output<typeof conversationSchema>;
