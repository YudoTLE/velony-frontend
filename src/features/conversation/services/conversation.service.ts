import api from '@shared/lib/api';
import { Conversation } from '@shared/types/conversation';

import { listConversationsResponseSchema } from '../schemas/list-conversations-response.schema';

export const conversationService = {
  async list() {
    const response = await api.get('/conversations');
    const data = listConversationsResponseSchema.parse(response.data);

    return data as Conversation[];
  },
};
