import { z } from 'zod';

import { getConversationResponseSchema } from './get-conversation-response.schema';

export const listConversationsResponseSchema = z.array(
  getConversationResponseSchema,
);
