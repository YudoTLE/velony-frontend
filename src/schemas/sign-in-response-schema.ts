import { z } from 'zod';

export const signInResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  tokenType: z.string(),
  issuedAt: z.int(),
  expiredAt: z.int(),
});

export type SignInResponse = z.infer<typeof signInResponseSchema>;
