import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authService } from '../services/auth.service';
import type { SignUpRequest } from '../types/sign-up-request';

export const useSignUpMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SignUpRequest) => {
      await authService.signUp(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
    },
  });
};
