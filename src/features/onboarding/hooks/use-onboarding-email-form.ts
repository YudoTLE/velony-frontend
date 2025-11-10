'use client';

import { useUpdateUserEmail } from '@user';
import { useRouter } from 'next/navigation';
import { useTransition, useState } from 'react';

export const useOnboardingEmailForm = () => {
  const router = useRouter();
  const [isConfirmTransitioning, startConfirmTransition] = useTransition();
  const [isSkipTransitioning, startSkipTransition] = useTransition();
  const [isStarted, setIsStarted] = useState(false);

  const {
    startForm,
    confirmForm,
    handleStart,
    handleConfirm,
    isStarting,
    isConfirming,
  } = useUpdateUserEmail();

  const handleUpdateStart = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const ok = await handleStart();
    if (!ok) return;

    setIsStarted(true);
  };

  const handleUpdateConfirm = async () => {
    const ok = await handleConfirm();
    if (!ok) return;

    startConfirmTransition(() => router.push('/'));
  };

  const handleSkip = () => {
    startSkipTransition(() => router.push('/'));
  };

  const handleRetry = () => setIsStarted(false);

  return {
    startForm,
    confirmForm,
    isStarted,
    handleUpdateStart,
    handleUpdateConfirm,
    handleSkip,
    handleRetry,
    isStarting: isStarting,
    isConfirming: isConfirming || isConfirmTransitioning,
    isSkipping: isSkipTransitioning,
  };
};
