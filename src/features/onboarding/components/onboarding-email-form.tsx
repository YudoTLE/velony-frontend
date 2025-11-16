'use client';

import { Button } from '@shared/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shared/components/ui/form';
import { Input } from '@shared/components/ui/input';
import { cn } from '@shared/lib/utils';
import { Mail as MailIcon } from 'lucide-react';
import React from 'react';

import { useOnboardingEmailForm } from '../hooks/use-onboarding-email-form';

export function OnboardingEmailForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const {
    startForm,
    confirmForm,
    isStarted,
    isStarting,
    isConfirming,
    isSkipping,
    handleUpdateStart,
    handleUpdateConfirm,
    handleSkip,
    handleRetry,
  } = useOnboardingEmailForm();

  return (
    <div className={cn('flex flex-col w-full gap-6', className)} {...props}>
      <Form {...startForm}>
        <form onSubmit={handleUpdateStart} className="space-y-6">
          {/* Email Field */}
          <FormField
            control={startForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Email Address</FormLabel>
                  {isStarted && (
                    <Button
                      type="button"
                      variant="link"
                      className="h-auto p-0 text-xs"
                      onClick={handleRetry}
                      disabled={isStarting}
                    >
                      Retry
                    </Button>
                  )}
                </div>
                <FormControl>
                  <div className="relative flex items-center">
                    <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="you@example.com"
                      className="pl-10 pr-16"
                      disabled={isStarted || isStarting}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      className="absolute right-0.5 top-1/2 -translate-y-1/2 px-3 text-sm"
                      size="sm"
                      disabled={isStarted || isStarting}
                      onClick={handleUpdateStart}
                    >
                      {isStarted ? 'Sent' : 'Send'}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Form {...confirmForm}>
        <form onSubmit={handleUpdateConfirm} className="space-y-6">
          {/* OTP Field */}
          <FormField
            control={confirmForm.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    disabled={!isStarted || isConfirming}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              className="w-full"
              disabled={!isStarted || isConfirming}
            >
              {isConfirming ? 'Verifying...' : 'Continue'}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={handleSkip}
              disabled={isConfirming || isSkipping}
            >
              Skip for now
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
