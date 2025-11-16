import { useMutation } from '@tanstack/react-query';

import { userService } from '../services/user.service';
import type { UpdateUserPasswordRequest } from '../types/update-user-password-request';

export const useUpdateUserPasswordMutation = () => {
  return useMutation({
    mutationFn: async (data: UpdateUserPasswordRequest) =>
      await userService.updatePassword(data.oldPassword, data.newPassword),
  });
};
