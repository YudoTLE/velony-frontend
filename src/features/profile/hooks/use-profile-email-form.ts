'use client';

import { useUpdateUserEmail } from '@user';
import { useState } from 'react';

export const useProfileEmailForm = (initialValues: {
  email: string | null;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const {
    startForm,
    confirmForm,
    handleStart: _handleStart,
    handleConfirm: _handleConfirm,
    isStarting,
    isConfirming,
  } = useUpdateUserEmail({ email: initialValues.email || '' });

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = await _handleStart();
    if (!ok) return;

    setIsStarted(true);
    requestAnimationFrame(() => confirmForm.setFocus('otp'));
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = await _handleConfirm();
    if (!ok) return;

    confirmForm.reset();
    setIsEditing(false);
    setIsStarted(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    requestAnimationFrame(() => startForm.setFocus('email'));
  };

  const handleCancel = () => {
    startForm.reset();
    confirmForm.reset();
    setIsEditing(false);
    setIsStarted(false);
  };

  return {
    startForm,
    confirmForm,
    isEditing,
    isStarted,
    isStarting,
    isConfirming,
    handleStart,
    handleConfirm,
    handleEdit,
    handleCancel,
    hasNoEmail: !startForm.formState.defaultValues?.email,
  };
};
