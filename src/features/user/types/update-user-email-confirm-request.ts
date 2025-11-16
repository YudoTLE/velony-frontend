import { z } from 'zod';

import { updateUserEmailConfirmRequestSchema } from '../schemas/update-user-email-confirm-request.schema';

export type UpdateUserEmailConfirmRequest = z.infer<
  typeof updateUserEmailConfirmRequestSchema
>;
