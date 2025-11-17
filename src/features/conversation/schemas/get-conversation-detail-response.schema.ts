import { z } from 'zod';

export const getConversationDetailSchema = z
  .object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string(),
    thumbnailUrl: z.string().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    users: z.array(
      z.object({
        name: z.string(),
        username: z.string(),
        avatarUrl: z.string().nullable(),
        role: z.enum(['owner', 'admin', 'member']),
      }),
    ),
  })
  .transform((data) => ({
    ...data,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/c/${data.id}`,
    thumbnailUrl: data.thumbnailUrl
      ? `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${data.thumbnailUrl}`
      : null,
    users: data.users.map((user) => ({
      ...user,
      avatarUrl: user.avatarUrl
        ? `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${user.avatarUrl}`
        : null,
    })),
  }));
