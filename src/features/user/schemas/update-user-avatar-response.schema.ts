import { z } from 'zod';

export const updateUserAvatarResponseSchema = z
  .object({
    avatarUrl: z.string(),
  })
  .transform((data) => ({
    ...data,
    avatarUrl: `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${data.avatarUrl}`,
  }));
