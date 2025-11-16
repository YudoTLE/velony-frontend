import { OnboardingEmailForm } from '@/features/onboarding/components/onboarding-email-form';

export default function OnboardingSetEmailPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="flex flex-col gap-6 w-full max-w-md">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Verify your email</h1>
          <p className="text-muted-foreground text-sm">
            We&apos;ll send you a verification code to confirm your email
            address
          </p>
        </div>

        {/* Form */}
        <OnboardingEmailForm />
      </div>
    </div>
  );
}
