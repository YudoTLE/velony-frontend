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
import { UpdateUserUsernameRequest } from '@user';
import { AlertCircle, Pencil, X } from 'lucide-react';

import { useProfileUsernameForm } from '../hooks/use-profile-username-form';

interface ProfileNameProps {
  initialValues: UpdateUserUsernameRequest;
}

export const ProfileUsernameForm = ({ initialValues }: ProfileNameProps) => {
  const {
    form,
    isUpdating,
    isEditing,
    handleUpdate,
    handleEdit,
    handleCancel,
  } = useProfileUsernameForm(initialValues);

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium leading-none text-muted-foreground">
          Username
        </span>

        {isUpdating ? (
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
            <Pencil className="size-3" />
          </Button>
        )}
      </div>

      {form.formState.errors.root && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertDescription>
            {form.formState.errors.root.message}
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={handleUpdate}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Your username"
                    variant="underline"
                    disabled={!isEditing || isUpdating}
                    className="disabled:opacity-100"
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
        value={isEditing ? 'buttons' : undefined}
      >
        <AccordionItem value="buttons">
          <AccordionContent className="flex gap-2 mt-2 pb-0">
            <Button
              type="button"
              size="sm"
              onClick={handleUpdate}
              disabled={isUpdating}
            >
              Save
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleCancel}
              disabled={isUpdating}
            >
              Cancel
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
