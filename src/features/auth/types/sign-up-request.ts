import { z } from 'zod';

import { signUpRequestSchema } from '../schemas/sign-up-request.schema';

export type SignUpRequest = z.infer<typeof signUpRequestSchema>;
