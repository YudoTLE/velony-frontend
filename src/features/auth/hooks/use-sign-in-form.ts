import { zodResolver } from '@hookform/resolvers/zod';
import { errorSchema } from '@shared/schemas/error.schema';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { useSignInMutation } from '../mutations/use-sign-in-mutation';
import { signInRequestSchema } from '../schemas/sign-in-request.schema';

export const useSignInForm = () => {
  const router = useRouter();
  const [isSubmitTransitioning, startSubmitTransition] = useTransition();

  const form = useForm({ resolver: zodResolver(signInRequestSchema) });

  const signIn = useSignInMutation();

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await signIn.mutateAsync(data);

      startSubmitTransition(() => router.push('/'));
    } catch (err) {
      const error = errorSchema.parse(err);

      if (error.status === 401) {
        form.setError('root', {
          type: 'manual',
          message: 'Invalid username or password',
        });
      } else {
        form.setError('root', {
          type: 'manual',
          message: 'An error occurred. Please try again.',
        });
      }
    }
  });

  const isSubmitting = signIn.isPending || isSubmitTransitioning;

  return {
    form,
    handleSubmit,
    isSubmitting,
  };
};
