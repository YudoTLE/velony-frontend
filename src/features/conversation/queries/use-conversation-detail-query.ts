import { useQuery } from '@tanstack/react-query';

import { conversationService } from '../services/conversation.service';

export const useConversationDetailQuery = (id: string) => {
  return useQuery({
    queryKey: ['conversations', 'detail', id],
    queryFn: async () => {
      return await conversationService.get(id);
    },
  });
};
