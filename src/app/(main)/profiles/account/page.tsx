import { ProfileAccountForm } from '@profile';

export default async function ProfileAccountPage() {
  return (
    <div className="p-5 w-full flex flex-col items-center">
      <div className="max-w-xl w-full">
        <ProfileAccountForm />
      </div>
    </div>
  );
}
