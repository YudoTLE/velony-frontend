import { z } from 'zod';

export const listConversationSummarySchema = z.array(
  z
    .object({
      id: z.uuid(),
      title: z.string(),
      thumbnailUrl: z.url().nullable(),
      createdAt: z.coerce.date(),
      lastMessage: z
        .object({
          id: z.uuid(),
          content: z.string(),
          senderName: z.string().nullable(),
          updatedAt: z.coerce.date(),
        })
        .nullable(),
    })
    .transform((data) => ({
      ...data,
      url: `${process.env.NEXT_PUBLIC_S3_BASE_URL}/c/${data.id}`,
    })),
);
