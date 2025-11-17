import { z } from 'zod';

export const listConversationSummarySchema = z.array(
  z
    .object({
      id: z.uuid(),
      title: z.string(),
      thumbnailUrl: z.url().nullable(),
      lastMessage: z
        .object({
          id: z.uuid(),
          content: z.string(),
          userName: z.string().nullable(),
          createdAt: z.coerce.date(),
          updatedAt: z.coerce.date(),
        })
        .nullable(),
    })
    .transform((data) => ({
      ...data,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/c/${data.id}`,
      thumbnailUrl: data.thumbnailUrl
        ? `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${data.thumbnailUrl}`
        : null,
    })),
);
