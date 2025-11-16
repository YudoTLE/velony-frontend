'use client';

import { useUpdateUserUsername, type UpdateUserUsernameRequest } from '@user';
import { useState } from 'react';

export const useProfileUsernameForm = (
  initialValues: UpdateUserUsernameRequest,
) => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    form,
    handleUpdate: _handleUpdate,
    isUpdating,
  } = useUpdateUserUsername(initialValues);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = await _handleUpdate();
    if (!ok) return;

    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    requestAnimationFrame(() => form.setFocus('username'));
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
