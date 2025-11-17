import { convertTime } from '@shared/lib/time';
import { useQuery } from '@tanstack/react-query';

import { userService } from '../services/user.service';

export const useUsersMeQuery = () => {
  return useQuery({
    queryKey: ['users', 'me'],
    queryFn: async () => {
      return await userService.getMe();
    },
    staleTime: convertTime('1h').milliseconds,
    gcTime: convertTime('1d').milliseconds,
  });
};
