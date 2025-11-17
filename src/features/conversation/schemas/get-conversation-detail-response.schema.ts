import { z } from 'zod';

export const getConversationDetailSchema = z
  .object({
    id: z.uuid(),
    title: z.string(),
    description: z.string(),
    thumbnailUrl: z.url().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    users: z.array(
      z.object({
        id: z.uuid(),
        name: z.string(),
        username: z.string(),
        avatarUrl: z.url().nullable(),
        role: z.enum(['owner', 'admin', 'member']),
      }),
    ),
  })
  .transform((data) => ({
    ...data,
    url: `${process.env.NEXT_PUBLIC_S3_BASE_URL}/c/${data.id}`,
  }));
