import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';

import api from '@/lib/api';
import { SignUpRequest } from '@/schemas/sign-up-request-schema';

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: async (payload: SignUpRequest) => {
      await api.post('/auth/sign-up', payload);

      const result = await signIn('credentials', {
        redirect: false,
        ...payload,
      });

      return result;
    },
  });
};
