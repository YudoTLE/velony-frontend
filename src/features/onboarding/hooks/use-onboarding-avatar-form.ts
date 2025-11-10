import { useImageUpdate } from '@shared/hooks/use-image-update';
import { useUpdateUserAvatarMutation } from '@user';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export const useOnboardingAvatarForm = () => {
  const router = useRouter();
  const { preview, error, isUpdating, handleFileSelect, handleUpdate } =
    useImageUpdate(useUpdateUserAvatarMutation);
  const [isUpdateTransitioning, startUpdateTransition] = useTransition();
  const [isSkipTransitioning, startSkipTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!(await handleUpdate())) return;

    startUpdateTransition(async () => router.push('/'));
  };

  const handleSkip = () => {
    startSkipTransition(() => {
      router.push('/onboarding/email');
    });
  };

  return {
    preview,
    error,
    handleFileSelect,
    handleSubmit,
    handleSkip,
    isUpdating: isUpdating || isUpdateTransitioning,
    isSkipping: isSkipTransitioning,
  };
};
