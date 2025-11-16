'use client';

import { useUpdateUserName, type UpdateUserNameRequest } from '@user';
import { useState } from 'react';

export const useProfileNameForm = (initialValues: UpdateUserNameRequest) => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    form,
    handleUpdate: _handleUpdate,
    isUpdating,
  } = useUpdateUserName(initialValues);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = await _handleUpdate();
    if (!ok) return;

    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    requestAnimationFrame(() => form.setFocus('name'));
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
