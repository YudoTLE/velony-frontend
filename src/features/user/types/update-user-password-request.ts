import { z } from 'zod';

import { updateUserPasswordRequestSchema } from '../schemas/update-user-password-request.schema';

export type UpdateUserPasswordRequest = z.infer<
  typeof updateUserPasswordRequestSchema
>;
