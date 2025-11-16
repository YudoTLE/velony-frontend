'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@shared/components/ui/accordion';
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
import { Pencil, X } from 'lucide-react';

import { useProfilePasswordForm } from '../hooks/use-profile-password-form';

export const ProfilePasswordForm = () => {
  const {
    form,
    isUpdating,
    isEditing,
    handleUpdate,
    handleEdit,
    handleCancel,
  } = useProfilePasswordForm();

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium leading-none text-muted-foreground">
          Password
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

      <Form {...form}>
        <form onSubmit={handleUpdate}>
          <div className="space-y-2">
            {isEditing ? (
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Old Password"
                        variant="underline"
                        disabled={isUpdating}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <div className="relative">
                <Input
                  type="password"
                  value="secretpassword"
                  variant="underline"
                  disabled
                  className="disabled:opacity-100"
                />
              </div>
            )}

            <Accordion
              type="single"
              collapsible
              value={isEditing ? 'new-password' : undefined}
            >
              <AccordionItem value="new-password">
                <AccordionContent className="pb-0">
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="New Password"
                            variant="underline"
                            disabled={isUpdating}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
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
