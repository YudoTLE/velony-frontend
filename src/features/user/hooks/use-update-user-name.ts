'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { errorSchema } from '@shared/schemas/error.schema';
import { useForm } from 'react-hook-form';

import { useUpdateUserNameMutation } from '../mutations/use-update-user-name-mutation';
import { updateUserNameRequestSchema } from '../schemas/update-user-name-request.schema';
import type { UpdateUserNameRequest } from '../types/update-user-name-request';

export const useUpdateUserName = (initialValues: UpdateUserNameRequest) => {
  const form = useForm({
    resolver: zodResolver(updateUserNameRequestSchema),
    defaultValues: initialValues,
  });

  const update = useUpdateUserNameMutation();

  const handleUpdate = (): Promise<boolean> => {
    return new Promise((resolve) => {
      form.handleSubmit(async (data) => {
        try {
          await update.mutateAsync(data.name);
          form.reset(data);
          resolve(true);
        } catch (err) {
          const error = errorSchema.parse(err);

          form.setError('root', { type: 'server', message: error.message });
          if (error.errors) {
            Object.entries(error.errors).forEach(([key, messages]) => {
              if (key in form.getValues()) {
                form.setError(key as keyof UpdateUserNameRequest, {
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
