import { zodResolver } from '@hookform/resolvers/zod';
import { errorSchema } from '@shared/schemas/error.schema';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { useSignUpMutation } from '../mutations/use-sign-up-mutation';
import { signUpRequestSchema } from '../schemas/sign-up-request.schema';

export const useSignUpForm = () => {
  const router = useRouter();
  const [isSubmitTransitioning, startSubmitTransition] = useTransition();

  const form = useForm({ resolver: zodResolver(signUpRequestSchema) });

  const signUp = useSignUpMutation();

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await signUp.mutateAsync(data);

      startSubmitTransition(() => router.push('/onboarding/avatar'));
    } catch (err) {
      const error = errorSchema.parse(err);

      if (error.status === 409) {
        form.setError('username', {
          type: 'manual',
          message: 'Username already exists',
        });
      } else if (error.status === 400) {
        form.setError('root', {
          type: 'manual',
          message: 'Invalid registration data. Please check your inputs.',
        });
      } else {
        form.setError('root', {
          type: 'manual',
          message: 'An error occurred. Please try again.',
        });
      }
    }
  });

  const isSubmitting = signUp.isPending || isSubmitTransitioning;

  return { form, handleSubmit, isSubmitting };
};
