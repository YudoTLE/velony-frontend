import { messageSchema } from '@shared/schemas/message.schema';
import { z } from 'zod';

export const getConversationResponseSchema = z
  .object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string(),
    thumbnailUrl: z.string().url().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    joinedAt: z.coerce.date(),
    role: z.enum(['owner', 'admin', 'member']),
    lastMessage: messageSchema.optional(),
  })
  .transform((data) => ({
    ...data,
    url: `${process.env.NEXT_PUBLIC_S3_BASE_URL}/c/${data.id}`,
  }));
