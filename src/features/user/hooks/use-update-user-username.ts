'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { errorSchema } from '@shared/schemas/error.schema';
import { useForm } from 'react-hook-form';

import { useUpdateUserUsernameMutation } from '../mutations/use-update-user-username-mutation';
import { updateUserUsernameRequestSchema } from '../schemas/update-user-username-request.schema';
import type { UpdateUserUsernameRequest } from '../types/update-user-username-request';

export const useUpdateUserUsername = (
  initialValues: UpdateUserUsernameRequest,
) => {
  const form = useForm({
    resolver: zodResolver(updateUserUsernameRequestSchema),
    defaultValues: initialValues,
  });

  const update = useUpdateUserUsernameMutation();

  const handleUpdate = (): Promise<boolean> => {
    return new Promise((resolve) => {
      form.handleSubmit(async (data) => {
        try {
          await update.mutateAsync(data.username);
          form.reset(data);
          resolve(true);
        } catch (err) {
          const error = errorSchema.parse(err);

          form.setError('root', { type: 'server', message: error.message });
          if (error.errors) {
            Object.entries(error.errors).forEach(([key, messages]) => {
              if (key in form.getValues()) {
                form.setError(key as keyof UpdateUserUsernameRequest, {
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
