'use client';

import { Alert, AlertDescription } from '@shared/components/ui/alert';
import { Button } from '@shared/components/ui/button';
import { cn } from '@shared/lib/utils';
import { Camera as CameraIcon, User as UserIcon } from 'lucide-react';
import React, { useState } from 'react';

import { useOnboardingAvatarForm } from '../hooks/use-onboarding-avatar-form';

export function OnboardingAvatarForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const {
    preview,
    error,
    isUpdating,
    isSkipping,
    handleFileSelect,
    handleSubmit,
    handleSkip,
  } = useOnboardingAvatarForm();

  const [isDragging, setIsDragging] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0] || null;
    handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className={cn('flex flex-col w-full gap-6', className)} {...props}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Avatar Upload Area */}
        <div className="flex flex-col items-center gap-4">
          {/* Preview Circle */}
          <div className="relative">
            <div
              className={cn(
                'w-32 h-32 rounded-full border-2 border-dashed border-border flex items-center justify-center overflow-hidden bg-muted transition-colors',
                isDragging && 'border-primary bg-primary/5',
              )}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {preview ? (
                /* eslint-disable @next/next/no-img-element */
                <img
                  src={preview}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserIcon className="w-12 h-12 text-muted-foreground" />
              )}
            </div>

            {/* Camera Icon Button */}
            <label
              htmlFor="profile-picture-input"
              className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors shadow-lg"
            >
              <CameraIcon className="w-5 h-5" />
              <input
                id="profile-picture-input"
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Upload Instructions */}
          <div className="text-center space-y-1">
            <p className="text-sm font-medium">Upload your avatar</p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG or GIF (max. 5MB)
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Button
            type="submit"
            className="w-full"
            disabled={isUpdating || !preview}
          >
            {isUpdating ? 'Updating...' : 'Continue'}
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={handleSkip}
            disabled={isUpdating || isSkipping}
          >
            Skip for now
          </Button>
        </div>
      </form>
    </div>
  );
}
