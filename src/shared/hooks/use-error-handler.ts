'use client';

import { useState } from 'react';

import { errorSchema } from '../schemas/error.schema';

export const useErrorHandler = () => {
  const [error, setError] = useState<string | null>(null);

  const setFromException = (err: unknown) => {
    const parsed = errorSchema.parse(err);
    setError(parsed.messages[0]);
  };

  return {
    error,
    setError,
    setFromException,
  };
};
