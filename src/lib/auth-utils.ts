import axios from 'axios';

import {
  signInResponseSchema,
  type SignInResponse,
} from '@/schemas/sign-in-response-schema';

export async function refreshAccessToken(
  refreshToken: string,
): Promise<SignInResponse | null> {
  try {
    const response = await axios.post<SignInResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      { refreshToken },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      },
    );

    const authData = signInResponseSchema.parse(response.data);
    return authData;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Token refresh failed:', error);
    return null;
  }
}

export function isTokenExpired(expiredAt: number | undefined): boolean {
  if (!expiredAt) return false;
  return Date.now() >= expiredAt * 1000;
}
