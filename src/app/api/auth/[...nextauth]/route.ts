import type { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

import {
  signInRequestSchema,
  type SignInRequest,
} from '@/schemas/sign-in-request-schema';
import {
  signInResponseSchema,
  type SignInResponse,
} from '@/schemas/sign-in-response-schema';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      id: 'credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Username and password are required');
        }

        try {
          const validatedCredentials: SignInRequest = signInRequestSchema.parse(
            {
              username: credentials.username,
              password: credentials.password,
            },
          );

          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,
            validatedCredentials,
            { withCredentials: true },
          );

          const user = await axios.get<User>(
            `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
            { withCredentials: true },
          );
          console.log('user', user);

          return user;
        } catch (error) {
          console.error('Authentication error:', error);
          throw new Error('Authentication failed');
        }
      },
    }),
  ],

  callbacks: {},

  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/error',
  },

  secret: process.env.NEXTAUTH_SECRET,

  debug: process.env.NODE_ENV === 'development',
};
