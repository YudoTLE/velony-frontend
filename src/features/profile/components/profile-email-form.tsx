'use client';

import { Alert, AlertDescription } from '@shared/components/ui/alert';
import { Button } from '@shared/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
} from '@shared/components/ui/collapsible';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@shared/components/ui/form';
import { Input } from '@shared/components/ui/input';
import { Spinner } from '@shared/components/ui/spinner';
import { Pencil, X, Plus, AlertCircle } from 'lucide-react';

import { useProfileEmailForm } from '../hooks/use-profile-email-form';

interface ProfileEmailProps {
  initialValues: { email: string | null };
}

export const ProfileEmailForm = ({ initialValues }: ProfileEmailProps) => {
  const {
    startForm,
    confirmForm,
    isEditing,
    isStarted,
    isStarting,
    isConfirming,
    hasNoEmail,
    handleStart,
    handleConfirm,
    handleEdit,
    handleCancel,
  } = useProfileEmailForm(initialValues);

  return (
    <div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium leading-none">Email</span>

          {isConfirming ? (
            <Button variant="ghost" className="size-6" disabled>
              <Spinner className="size-3" />
            </Button>
          ) : isEditing ? (
            <Button
              onClick={handleCancel}
              type="button"
              variant="ghost"
              className="size-6"
            >
              <X className="size-3" />
            </Button>
          ) : (
            <Button
              onClick={handleEdit}
              type="button"
              variant="ghost"
              className="size-6"
            >
              {hasNoEmail ? (
                <Plus className="size-3" />
              ) : (
                <Pencil className="size-3" />
              )}
            </Button>
          )}
        </div>

        {startForm.formState.errors.root && (
          <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <AlertDescription>
              {startForm.formState.errors.root.message}
            </AlertDescription>
          </Alert>
        )}

        <Form {...startForm}>
          <form onSubmit={handleStart}>
            <FormField
              control={startForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={
                        hasNoEmail && !isEditing
                          ? '-- no email --'
                          : 'new_email@example.com'
                      }
                      disabled={!isEditing || isStarting || isStarted}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <Collapsible open={isStarted}>
          <CollapsibleContent className="space-y-2">
            <Form {...confirmForm}>
              <form onSubmit={handleConfirm}>
                <FormField
                  control={confirmForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter 6-digit code"
                          maxLength={6}
                          disabled={isConfirming}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={isEditing}>
          <CollapsibleContent className="flex gap-2">
            {isStarted ? (
              <>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleConfirm}
                  disabled={isConfirming}
                >
                  Confirm
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleCancel}
                  disabled={isConfirming}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleStart}
                  disabled={isStarting}
                >
                  Send Verification
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleCancel}
                  disabled={isStarting}
                >
                  Cancel
                </Button>
              </>
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};
