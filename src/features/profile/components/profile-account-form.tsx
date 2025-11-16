import { userService } from '@user';

import { ProfileEmailForm } from './profile-email-form';
import { ProfileNameForm } from './profile-name-form';
import { ProfilePasswordForm } from './profile-password-form';
import { ProfileUsernameForm } from './profile-username-form';

export const ProfileAccountForm = async () => {
  const user = await userService.getMe();

  return (
    <div className="w-full space-y-10">
      <h1 className="text-5xl font-semibold">Account</h1>

      <div className="space-y-3">
        <ProfileUsernameForm initialValues={user} />
        <ProfileNameForm initialValues={user} />
        <ProfilePasswordForm />
        <ProfileEmailForm initialValues={user} />
      </div>
    </div>
  );
};
