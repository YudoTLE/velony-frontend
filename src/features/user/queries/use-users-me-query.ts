import { useQuery } from '@tanstack/react-query';

import { userService } from '../services/user.service';

export const useUsersMeQuery = () => {
  return useQuery({
    queryKey: ['users', 'me'],
    queryFn: async () => {
      return await userService.getMe();
    },
  });
};
