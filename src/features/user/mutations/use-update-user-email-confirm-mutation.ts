import { User } from '@shared/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userService } from '../services/user.service';

export const useUpdateUserEmailConfirmMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (otp: string) =>
      await userService.updateEmailConfirm(otp),
    onSuccess: (updatedFields) => {
      queryClient.setQueryData(['users', 'me'], (oldUser?: User) => {
        if (!oldUser) return oldUser;
        return { ...oldUser, ...updatedFields };
      });
    },
  });
};
