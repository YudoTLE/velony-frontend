import { z } from 'zod';

import { updateUserEmailStartRequestSchema } from '../schemas/update-user-email-start-request.schema';

export type UpdateUserEmailStartRequest = z.infer<
  typeof updateUserEmailStartRequestSchema
>;
