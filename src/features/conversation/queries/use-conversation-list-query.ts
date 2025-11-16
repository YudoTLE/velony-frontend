import { useQuery } from '@tanstack/react-query';

import { conversationService } from '../services/conversation.service';

export const useConversationListQuery = () => {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      return await conversationService.list();
    },
  });
};
