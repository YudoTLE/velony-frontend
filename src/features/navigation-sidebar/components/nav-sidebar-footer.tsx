'use client';

import { useAppSidebarContext } from '@app-sidebar';
import { UserIconSelf } from '@shared/components/icon/user-icon';
import { Button } from '@shared/components/ui/button';
import { CardFooter } from '@shared/components/ui/card';
import * as React from 'react';

export const NavSidebarFooter = () => {
  const { setActive } = useAppSidebarContext();

  const handleClick = () => {
    setActive('profiles');
  };

  return (
    <CardFooter className="p-0 pb-2 sm:pb-4 mt-auto justify-center">
      <Button
        onClick={handleClick}
        variant="ghost"
        size="icon"
        className="rounded-full"
        aria-label="User profile"
      >
        <UserIconSelf className="size-7" />
      </Button>
    </CardFooter>
  );
};
