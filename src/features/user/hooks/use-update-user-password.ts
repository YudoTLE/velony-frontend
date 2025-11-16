'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { errorSchema } from '@shared/schemas/error.schema';
import { useForm } from 'react-hook-form';

import { useUpdateUserPasswordMutation } from '../mutations/use-update-user-password-mutation';
import { updateUserPasswordRequestSchema } from '../schemas/update-user-password-request.schema';
import type { UpdateUserPasswordRequest } from '../types/update-user-password-request';

export const useUpdateUserPassword = () => {
  const form = useForm({
    resolver: zodResolver(updateUserPasswordRequestSchema),
  });

  const update = useUpdateUserPasswordMutation();

  const handleUpdate = (): Promise<boolean> => {
    return new Promise((resolve) => {
      form.handleSubmit(async (data) => {
        try {
          await update.mutateAsync(data);
          resolve(true);
        } catch (err) {
          const error = errorSchema.parse(err);

          form.setError('root', { type: 'server', message: error.message });
          if (error.errors) {
            Object.entries(error.errors).forEach(([key, messages]) => {
              if (key in form.getValues()) {
                form.setError(key as keyof UpdateUserPasswordRequest, {
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
    form,
    handleUpdate,
    isUpdating: update.isPending,
  };
};
