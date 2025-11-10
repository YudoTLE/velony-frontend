import api from '@shared/lib/api';

import type { SignInRequest } from '../types/sign-in-request';
import type { SignUpRequest } from '../types/sign-up-request';

export const authService = {
  async signIn(data: SignInRequest) {
    await api.post('/auth/sign-in', data);
  },

  async signUp(data: SignUpRequest) {
    await api.post('/auth/sign-up', data);
  },
};
