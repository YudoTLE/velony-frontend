'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@shared/components/ui/accordion';
import { Alert, AlertDescription } from '@shared/components/ui/alert';
import { Button } from '@shared/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@shared/components/ui/form';
import { Input } from '@shared/components/ui/input';
import { Spinner } from '@shared/components/ui/spinner';
import { AlertCircle, Pencil, Plus, X } from 'lucide-react';

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
                    variant="underline"
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

      <Accordion
        type="single"
        collapsible
        value={isStarted ? 'otp' : undefined}
      >
        <AccordionItem value="otp">
          <AccordionContent className="pb-0 mt-2">
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
                          variant="underline"
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion
        type="single"
        collapsible
        value={isEditing ? 'buttons' : undefined}
      >
        <AccordionItem value="buttons">
          <AccordionContent className="flex gap-2 mt-2 pb-0">
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
