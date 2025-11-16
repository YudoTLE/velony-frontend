import { zodResolver } from '@hookform/resolvers/zod';
import { errorSchema } from '@shared/schemas/error.schema';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { useSignUpMutation } from '../mutations/use-sign-up-mutation';
import { signUpRequestSchema } from '../schemas/sign-up-request.schema';
import { SignUpRequest } from '../types/sign-up-request';

export const useSignUpForm = () => {
  const router = useRouter();
  const [isSubmitTransitioning, startSubmitTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(signUpRequestSchema),
    defaultValues: signUpRequestSchema.parse({}),
  });

  const signUp = useSignUpMutation();

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await signUp.mutateAsync(data);

      startSubmitTransition(() => router.push('/onboarding/avatar'));
    } catch (err) {
      const error = errorSchema.parse(err);

      if (error.statusCode === 409)
        form.setError('username', { type: 'server', message: error.message });
      else form.setError('root', { type: 'server', message: error.message });
      if (error.errors) {
        Object.entries(error.errors).forEach(([key, messages]) => {
          if (key in form.getValues()) {
            form.setError(key as keyof SignUpRequest, {
              type: 'server',
              message: messages.join(', '),
            });
          }
        });
      }
    }
  });

  const isSubmitting = signUp.isPending || isSubmitTransitioning;

  return { form, handleSubmit, isSubmitting };
};
