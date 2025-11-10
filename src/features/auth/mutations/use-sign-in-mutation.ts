import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authService } from '../services/auth.service';
import type { SignInRequest } from '../types/sign-in-request';

export const useSignInMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SignInRequest) => {
      await authService.signIn(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
    },
  });
};
