import { useMutation } from '@tanstack/react-query';

import { userService } from '../services/user.service';

export const useUpdateUserEmailStartMutation = () => {
  return useMutation({
    mutationFn: async (newEmail: string) =>
      await userService.updateEmailStart(newEmail),
  });
};
