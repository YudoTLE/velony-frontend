'use client';

import { useState } from 'react';

export const useImageSelection = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const selectFile = (file: File | null): boolean => {
    if (!file) return false;
    if (!file.type.startsWith('image/')) return false;

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    return true;
  };

  return {
    selectedFile,
    preview,
    selectFile,
  };
};
