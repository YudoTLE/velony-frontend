'use client';

import { useUpdateUserPassword } from '@user';
import { useState } from 'react';

export const useProfilePasswordForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    form,
    handleUpdate: _handleUpdate,
    isUpdating,
  } = useUpdateUserPassword();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = await _handleUpdate();
    if (!ok) return;

    form.reset();
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    requestAnimationFrame(() => form.setFocus('oldPassword'));
  };

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  return {
    form,
    isEditing,
    isUpdating,
    handleUpdate,
    handleEdit,
    handleCancel,
  };
};
