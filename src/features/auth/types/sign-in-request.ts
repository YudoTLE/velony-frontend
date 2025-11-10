import { z } from 'zod';

import { signInRequestSchema } from '../schemas/sign-in-request.schema';

export type SignInRequest = z.infer<typeof signInRequestSchema>;
