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
import { Pencil, X, AlertCircle } from 'lucide-react';

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
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium leading-none">Password</span>

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

        <Collapsible open={!isEditing}>
          <CollapsibleContent>
            <div className="relative">
              <Input type="password" value="secretpassword" disabled />
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={isEditing}>
          <CollapsibleContent className="space-y-2">
            <Form {...form}>
              <form onSubmit={handleUpdate}>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Old Password"
                            disabled={isUpdating || !isEditing}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="New Password"
                            disabled={isUpdating || !isEditing}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={isEditing}>
          <CollapsibleContent className="flex gap-2">
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
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};
