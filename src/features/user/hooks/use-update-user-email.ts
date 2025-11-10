'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { errorSchema } from '@shared/schemas/error.schema';
import { useForm } from 'react-hook-form';

import { useUpdateUserEmailConfirmMutation } from '../mutations/use-update-user-email-confirm-mutation';
import { useUpdateUserEmailStartMutation } from '../mutations/use-update-user-email-start-mutation';
import { updateUserEmailConfirmRequestSchema } from '../schemas/update-user-email-confirm-request.schema';
import { updateUserEmailStartRequestSchema } from '../schemas/update-user-email-start-request.schema';

export const useUpdateUserEmail = () => {
  const startForm = useForm({
    resolver: zodResolver(updateUserEmailStartRequestSchema),
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
          startForm.setError('email', {
            type: 'manual',
            message: error.messages[0],
          });
          resolve(false);
        }
      })();
    });
  };
  const handleConfirm = (): Promise<boolean> => {
    return new Promise((resolve) => {
      confirmForm.handleSubmit(async (data) => {
        {
          try {
            await updateConfirm.mutateAsync(data.otp);
            resolve(true);
          } catch (err) {
            const error = errorSchema.parse(err);
            confirmForm.setError('otp', {
              type: 'manual',
              message: error.messages[0],
            });
            resolve(false);
          }
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
