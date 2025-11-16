import { OnboardingAvatarForm } from '@/features/onboarding/components/onboarding-avatar-form';

export default function OnboardingSetAvatarPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="flex flex-col gap-6 w-full max-w-md">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Set up your avatar</h1>
          <p className="text-muted-foreground text-sm">
            Add an avatar to personalize your account
          </p>
        </div>

        {/* Form */}
        <OnboardingAvatarForm />
      </div>
    </div>
  );
}
