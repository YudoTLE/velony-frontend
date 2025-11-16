import type { User } from '@shared/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userService } from '../services/user.service';

export const useUpdateUserUsernameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (username: string) =>
      await userService.updateUsername(username),
    onSuccess: (updatedFields) => {
      queryClient.setQueryData(['users', 'me'], (oldUser?: User) => {
        if (!oldUser) return oldUser;
        return { ...oldUser, ...updatedFields };
      });
    },
  });
};
