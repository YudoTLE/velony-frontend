import api from '@shared/lib/api';
import { User } from '@shared/types/user';

import { getUserResponseSchema } from '../schemas/get-user-response.schema';
import { updateUserAvatarResponseSchema } from '../schemas/update-user-avatar-response.schema';
import { updateUserEmailConfirmResponseSchema } from '../schemas/update-user-email-confirm-response.schema';
import { updateUserNameResponseSchema } from '../schemas/update-user-name-response.schema';
import { updateUserUsernameResponseSchema } from '../schemas/update-user-username-response.schema';

export const userService = {
  async getMe() {
    const response = await api.get('/users/me');
    const data = getUserResponseSchema.parse(response.data);

    return data as User;
  },

  async updateUsername(newUsername: string) {
    const response = await api.put('/users/me/username', {
      username: newUsername,
    });
    const data = updateUserUsernameResponseSchema.parse(response.data);

    return data;
  },

  async updateName(newName: string) {
    const response = await api.put('/users/me/name', { name: newName });
    const data = updateUserNameResponseSchema.parse(response.data);

    return data;
  },

  async updateEmailStart(newEmail: string) {
    await api.post('/users/me/email/start', { email: newEmail });
  },

  async updateEmailConfirm(otp: string) {
    const response = await api.post('/users/me/email/confirm', { otp });
    const data = updateUserEmailConfirmResponseSchema.parse(response.data);

    return data;
  },

  async updateAvatar(newAvatar: File) {
    const formData = new FormData();
    formData.append('avatar', newAvatar);

    const response = await api.put('/users/me/avatar', formData);
    const data = updateUserAvatarResponseSchema.parse(response.data);

    return data;
  },

  async updatePassword(oldPassword: string, newPassword: string) {
    await api.put('/users/me/password', {
      oldPassword,
      newPassword,
    });
  },
};
