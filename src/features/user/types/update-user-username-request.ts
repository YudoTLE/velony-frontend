import { z } from 'zod';

import { updateUserUsernameRequestSchema } from '../schemas/update-user-username-request.schema';

export type UpdateUserUsernameRequest = z.infer<
  typeof updateUserUsernameRequestSchema
>;
