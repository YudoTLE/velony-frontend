import { z } from 'zod';

import { updateUserNameRequestSchema } from '../schemas/update-user-name-request.schema';

export type UpdateUserNameRequest = z.infer<typeof updateUserNameRequestSchema>;
