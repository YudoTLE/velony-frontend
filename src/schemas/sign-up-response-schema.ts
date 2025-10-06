import { z } from 'zod';

export const signUpResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  tokenType: z.string(),
  issuedAt: z.int(),
  expiredAt: z.int(),
});

export type SignUpResponse = z.infer<typeof signUpResponseSchema>;
