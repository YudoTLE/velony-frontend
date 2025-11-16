import type { User } from '@shared/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userService } from '../services/user.service';

export const useUpdateUserNameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => await userService.updateName(name),
    onSuccess: (updatedFields) => {
      queryClient.setQueryData(['users', 'me'], (oldUser?: User) => {
        if (!oldUser) return oldUser;
        return { ...oldUser, ...updatedFields };
      });
    },
  });
};
