import { z } from 'zod';

export const getUserResponseSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    username: z.string(),
    email: z.email().nullable(),
    phoneNumber: z.string().nullable(),
    avatarUrl: z.string().nullable(),
  })
  .transform((data) => ({
    ...data,
    avatarUrl: data.avatarUrl
      ? `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${data.avatarUrl}`
      : null,
  }));
