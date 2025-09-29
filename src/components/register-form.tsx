'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useEffect, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface RegisterData {
  name: string;
  username: string;
  password: string;
  profilePicture?: File;
  email?: string; // optional
  phone?: string; // optional
}

const STEPS = [
  {
    id: 1,
    title: 'Create your account',
    fields: ['name', 'username', 'password'],
  },
  { id: 2, title: 'Add Profile Picture', fields: ['profilePicture'] },
  { id: 3, title: 'Add Email Address', fields: ['email'] },
  { id: 4, title: 'Add Phone Number', fields: ['phone'] },
];

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    username: '',
    password: '',
    email: undefined,
    phone: undefined,
  });

  // Email verification states
  const [emailCode, setEmailCode] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [emailVerifying, setEmailVerifying] = useState(false);
  const [emailResendCooldown, setEmailResendCooldown] = useState(0);

  // Phone verification states
  const [phoneCode, setPhoneCode] = useState('');
  const [isPhoneSent, setIsPhoneSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [phoneSending, setPhoneSending] = useState(false);
  const [phoneVerifying, setPhoneVerifying] = useState(false);
  const [phoneResendCooldown, setPhoneResendCooldown] = useState(0);

  // --- Mock API helpers (replace with real API calls) ---
  const fakeNetworkDelay = (ms = 800) =>
    new Promise((res) => setTimeout(res, ms));

  const sendEmailCode = useCallback(async () => {
    if (!formData.email) return;
    setEmailSending(true);
    try {
      await fakeNetworkDelay();
      setIsEmailSent(true);
      setEmailResendCooldown(30); // 30s cooldown
    } finally {
      setEmailSending(false);
    }
  }, [formData.email]);

  const verifyEmailCode = useCallback(async () => {
    if (!emailCode || emailCode.length !== 6) return;
    setEmailVerifying(true);
    try {
      await fakeNetworkDelay();
      // simple mock: accept any 6-char numeric code
      setIsEmailVerified(true);
    } finally {
      setEmailVerifying(false);
    }
  }, [emailCode]);

  const sendPhoneCode = useCallback(async () => {
    if (!formData.phone) return;
    setPhoneSending(true);
    try {
      await fakeNetworkDelay();
      setIsPhoneSent(true);
      setPhoneResendCooldown(30);
    } finally {
      setPhoneSending(false);
    }
  }, [formData.phone]);

  const verifyPhoneCode = useCallback(async () => {
    if (!phoneCode || phoneCode.length !== 6) return;
    setPhoneVerifying(true);
    try {
      await fakeNetworkDelay();
      setIsPhoneVerified(true);
    } finally {
      setPhoneVerifying(false);
    }
  }, [phoneCode]);

  // Countdown effects
  useEffect(() => {
    if (emailResendCooldown <= 0) return;
    const id = setInterval(
      () => setEmailResendCooldown((c) => (c > 0 ? c - 1 : 0)),
      1000,
    );
    return () => clearInterval(id);
  }, [emailResendCooldown]);

  useEffect(() => {
    if (phoneResendCooldown <= 0) return;
    const id = setInterval(
      () => setPhoneResendCooldown((c) => (c > 0 ? c - 1 : 0)),
      1000,
    );
    return () => clearInterval(id);
  }, [phoneResendCooldown]);

  // Auto verify when full code entered (using shadcn input-otp)
  useEffect(() => {
    if (emailCode.length === 6 && !isEmailVerified && !emailVerifying) {
      void verifyEmailCode();
    }
  }, [emailCode, isEmailVerified, emailVerifying, verifyEmailCode]);

  useEffect(() => {
    if (phoneCode.length === 6 && !isPhoneVerified && !phoneVerifying) {
      void verifyPhoneCode();
    }
  }, [phoneCode, isPhoneVerified, phoneVerifying, verifyPhoneCode]);

  const updateFormData = (field: keyof RegisterData, value: string | File) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) setCurrentStep((prev) => prev + 1);
  };

  const skipStep = () => nextStep();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 4) {
      window.location.href = '/';
    } else {
      nextStep();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col justify-between flex-1">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="johndoe"
                    value={formData.username}
                    onChange={(e) => updateFormData('username', e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </div>
            </form>

            <div className="grid gap-6 mt-6">
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </div>

              <div className="text-center text-sm">
                Already have an account?{' '}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col justify-between flex-1">
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
                  {formData.profilePicture ? (
                    <Image
                      src={URL.createObjectURL(formData.profilePicture)}
                      alt="Profile preview"
                      width={128}
                      height={128}
                      className="w-32 h-32 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-muted-foreground text-xs">
                      No Image
                    </span>
                  )}
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="profilePicture">Profile Picture</Label>
                <Input
                  id="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) updateFormData('profilePicture', file);
                  }}
                />
              </div>
            </form>
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col justify-between flex-1">
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="email">Email Address</Label>
                  <button
                    type="button"
                    disabled={
                      !formData.email ||
                      emailSending ||
                      isEmailVerified ||
                      emailResendCooldown > 0
                    }
                    onClick={() => {
                      if (isEmailSent) {
                        if (emailResendCooldown === 0) sendEmailCode();
                      } else {
                        sendEmailCode();
                      }
                    }}
                    className="
                      ml-auto text-sm hover:text-primary cursor-pointer
                      disabled:text-muted-foreground 
                      disabled:cursor-default 
                      disabled:hover:text-muted-foreground
                    "
                  >
                    {isEmailVerified
                      ? 'Done'
                      : emailSending
                        ? 'Sending...'
                        : isEmailSent
                          ? emailResendCooldown > 0
                            ? `Resend (${emailResendCooldown})`
                            : 'Resend'
                          : 'Send Code'}
                  </button>
                </div>

                <div className="grid gap-0.5">
                  <Input
                    id="email"
                    type="email"
                    disabled={emailSending || emailResendCooldown > 0}
                    placeholder="john@example.com"
                    value={formData.email || ''}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className="flex-1"
                  />
                  <p className="text-xs text-muted-foreground">
                    You can skip adding an email for now and add it later.
                  </p>
                </div>
              </div>

              {isEmailSent && !isEmailVerified && (
                <div className="grid gap-3">
                  <Label htmlFor="otp">Input OTP</Label>
                  <InputOTP
                    maxLength={6}
                    value={emailCode}
                    onChange={(val) => {
                      setEmailCode(val);
                      if (val.length === 6) verifyEmailCode();
                    }}
                    disabled={emailVerifying || isEmailVerified}
                    containerClassName="gap-2"
                  >
                    <InputOTPGroup>
                      {[0, 1, 2].map((i) => (
                        <InputOTPSlot key={i} index={i} />
                      ))}
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      {[3, 4, 5].map((i) => (
                        <InputOTPSlot key={i} index={i} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              )}
            </form>
          </div>
        );

      case 4:
        return (
          <div className="flex flex-col justify-between flex-1">
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="phone">Phone Number (optional)</Label>
                  {isPhoneVerified && (
                    <span className="text-xs text-green-600 font-medium">
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone || ''}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    disabled={
                      !formData.phone ||
                      phoneSending ||
                      isPhoneVerified ||
                      phoneResendCooldown > 0
                    }
                    onClick={() => {
                      if (isPhoneSent) {
                        if (phoneResendCooldown === 0) sendPhoneCode();
                      } else {
                        sendPhoneCode();
                      }
                    }}
                  >
                    {isPhoneVerified
                      ? 'Done'
                      : phoneSending
                        ? 'Sending...'
                        : isPhoneSent
                          ? phoneResendCooldown > 0
                            ? `Resend (${phoneResendCooldown})`
                            : 'Resend'
                          : 'Send Code'}
                  </Button>
                </div>
                {isPhoneSent && !isPhoneVerified && (
                  <div className="grid gap-2">
                    <div className="flex flex-col gap-3">
                      <InputOTP
                        maxLength={6}
                        value={phoneCode}
                        onChange={setPhoneCode}
                        disabled={phoneVerifying || isPhoneVerified}
                        containerClassName="gap-2"
                      >
                        <InputOTPGroup>
                          {[0, 1, 2, 3, 4, 5].map((i) => (
                            <InputOTPSlot key={i} index={i} />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          disabled={
                            phoneVerifying ||
                            phoneCode.length !== 6 ||
                            isPhoneVerified
                          }
                          onClick={() => verifyPhoneCode()}
                        >
                          {isPhoneVerified
                            ? 'Verified'
                            : phoneVerifying
                              ? 'Verifying...'
                              : 'Verify'}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          disabled={phoneSending || phoneResendCooldown > 0}
                          onClick={() => sendPhoneCode()}
                        >
                          {phoneSending
                            ? 'Sending...'
                            : phoneResendCooldown > 0
                              ? `Resend (${phoneResendCooldown})`
                              : 'Resend Code'}
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      A code was sent to your phone. Standard messaging rates
                      may apply.
                    </p>
                  </div>
                )}
                {!formData.phone && (
                  <p className="text-xs text-muted-foreground">
                    You can skip adding a phone number now and secure your
                    account later.
                  </p>
                )}
              </div>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="rounded-2xl w-full max-w-md min-h-[600px] flex flex-col">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            {STEPS.find((step) => step.id === currentStep)?.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          {renderStep()}

          {currentStep > 1 && (
            <div className="mt-6">
              <div className="flex gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={skipStep}
                  className="flex-1"
                >
                  Skip
                </Button>
                <Button
                  onClick={handleSubmit}
                  variant="ghost"
                  className="flex-1 text-primary hover:text-primary"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            {currentStep === 1 ? (
              <>
                By clicking continue, you agree to our{' '}
                <Link href="#">Terms of Service</Link> and{' '}
                <Link href="#">Privacy Policy</Link>.
              </>
            ) : (
              <>
                Account created! Continue setting up your profile or skip to
                start using your account.
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
