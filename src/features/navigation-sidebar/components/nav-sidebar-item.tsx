'use client';

import { useAppSidebarContext } from '@app-sidebar';
import { Button } from '@shared/components/ui/button';
import React from 'react';

import type { NavSidebarItem as NavSidebarItemType } from '../types/nav-sidebar-item';

interface NavSidebarItemProps {
  data: NavSidebarItemType;
}

export const NavSidebarItem = ({ data }: NavSidebarItemProps) => {
  const { setActive } = useAppSidebarContext();
  const Icon = data.icon;

  const handleClick = () => {
    setActive(data.id);
  };

  return (
    <div className="m-1">
      <Button variant="ghost" onClick={handleClick} size="icon">
        <Icon className="size-4" />
      </Button>
    </div>
  );
};
