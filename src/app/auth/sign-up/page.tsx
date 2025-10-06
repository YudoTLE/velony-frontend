import Link from 'next/link';

import { RegisterForm } from '@/components/forms/sign-up-form';

export default function SignUpPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="flex flex-col gap-6 w-full max-w-md">
        <div>
          <h1 className="text-3xl font-bold">Get started</h1>
          <sub className="text-muted-foreground">Create a new account</sub>
        </div>

        <RegisterForm />

        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{' '}
          <Link href="#">Terms of Service</Link> and{' '}
          <Link href="#">Privacy Policy</Link>.
        </div>
      </div>
    </div>
  );
}
