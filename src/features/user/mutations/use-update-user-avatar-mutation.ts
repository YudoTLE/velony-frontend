import type { User } from '@shared/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userService } from '../services/user.service';

export const useUpdateUserAvatarMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => await userService.updateAvatar(file),
    onSuccess: (updatedFields) => {
      queryClient.setQueryData(['users', 'me'], (oldUser?: User) => {
        if (!oldUser) return oldUser;
        return { ...oldUser, ...updatedFields };
      });
    },
  });
};
