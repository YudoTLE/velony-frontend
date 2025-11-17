import api from '@shared/lib/api';

import { getConversationDetailSchema } from '../schemas/get-conversation-detail-response.schema';
import { listConversationSummarySchema } from '../schemas/list-conversation-summary-response.schema';
import { ConversationDetail } from '../types/conversation-detail';
import { ConversationSummary } from '../types/conversation-summary';

export const conversationService = {
  async get(conversationId: string) {
    const response = await api.get(`/conversations/${conversationId}`);
    const data = getConversationDetailSchema.parse(response.data);

    return data as ConversationDetail;
  },

  async list() {
    const response = await api.get('/conversations');
    const data = listConversationSummarySchema.parse(response.data);

    return data as ConversationSummary[];
  },
};
