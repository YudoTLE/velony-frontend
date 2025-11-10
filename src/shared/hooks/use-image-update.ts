'use client';

import { UseMutationResult } from '@tanstack/react-query';

import { useErrorHandler } from './use-error-handler';
import { useImageSelection } from './use-image-selection';

export const useImageUpdate = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>(
  useMutation: () => UseMutationResult<TData, TError, TVariables, TContext>,
) => {
  // TODO: Replace with react-hook-form

  const { selectedFile, preview, selectFile } = useImageSelection();
  const { error, setError, setFromException } = useErrorHandler();
  const mutation = useMutation();

  const handleFileSelect = (file: File | null) => {
    setError(null);

    if (!file) return (setError('No file selected.'), false);
    if (!file.type.startsWith('image/'))
      return (setError('Invalid file type.'), false);

    return selectFile(file);
  };

  const handleUpdate = async () => {
    if (!selectedFile) {
      setError('Please select a profile picture');
      return false;
    }

    try {
      await mutation.mutateAsync(selectedFile as TVariables);
      return true;
    } catch (err) {
      setFromException(err);
      return false;
    }
  };

  return {
    selectedFile,
    preview,
    error,
    handleFileSelect,
    handleUpdate,
    isUpdating: mutation.isPending,
  };
};
