'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { errorSchema } from '@shared/schemas/error.schema';
import { useForm } from 'react-hook-form';

import { useUpdateUserEmailConfirmMutation } from '../mutations/use-update-user-email-confirm-mutation';
import { useUpdateUserEmailStartMutation } from '../mutations/use-update-user-email-start-mutation';
import { updateUserEmailConfirmRequestSchema } from '../schemas/update-user-email-confirm-request.schema';
import { updateUserEmailStartRequestSchema } from '../schemas/update-user-email-start-request.schema';
import { UpdateUserEmailStartRequest } from '../types/update-user-email-start-request';

export const useUpdateUserEmail = (
  initialValues: UpdateUserEmailStartRequest = { email: '' },
) => {
  const startForm = useForm({
    resolver: zodResolver(updateUserEmailStartRequestSchema),
    defaultValues: initialValues,
  });
  const confirmForm = useForm({
    resolver: zodResolver(updateUserEmailConfirmRequestSchema),
  });

  const updateStart = useUpdateUserEmailStartMutation();
  const updateConfirm = useUpdateUserEmailConfirmMutation();

  const handleStart = (): Promise<boolean> => {
    return new Promise((resolve) => {
      startForm.handleSubmit(async (data) => {
        try {
          await updateStart.mutateAsync(data.email);
          resolve(true);
        } catch (err) {
          const error = errorSchema.parse(err);

          startForm.setError('root', {
            type: 'server',
            message: error.message,
          });
          if (error.errors) {
            Object.entries(error.errors).forEach(([key, messages]) => {
              if (key in startForm.getValues()) {
                startForm.setError(key as keyof UpdateUserEmailStartRequest, {
                  type: 'server',
                  message: messages.join(', '),
                });
              }
            });
          }
          resolve(false);
        }
      })();
    });
  };

  const handleConfirm = (): Promise<boolean> => {
    return new Promise((resolve) => {
      confirmForm.handleSubmit(async (data) => {
        try {
          startForm.reset(await updateConfirm.mutateAsync(data.otp));
          resolve(true);
        } catch (err) {
          const error = errorSchema.parse(err);

          confirmForm.setError('root', {
            type: 'server',
            message: error.message,
          });
          if (error.errors) {
            Object.entries(error.errors).forEach(([key, messages]) => {
              if (key in confirmForm.getValues()) {
                confirmForm.setError(key as keyof { otp: string }, {
                  type: 'server',
                  message: messages.join(', '),
                });
              }
            });
          }
          resolve(false);
        }
      })();
    });
  };

  return {
    startForm,
    confirmForm,
    handleStart,
    handleConfirm,
    isStarting: updateStart.isPending,
    isConfirming: updateConfirm.isPending,
  };
};
