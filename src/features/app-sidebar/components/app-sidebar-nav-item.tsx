'use client';

import {
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@shared/components/ui/sidebar';
import React from 'react';

import { useAppSidebarContext } from './app-sidebar-provider';
import { SidebarItem } from '../types/sidebar-item';

interface AppSidebarNavItemProps {
  data: SidebarItem;
}

export const AppSidebarNavItem = ({ data }: AppSidebarNavItemProps) => {
  const { activeItem, handleActiveItemChange, isOpen } = useAppSidebarContext();
  const { setOpen } = useSidebar();
  const Icon = data.icon;
  const isActive = isOpen && activeItem?.id === data.id;

  const handleClick = () => {
    handleActiveItemChange(data.id);
    setOpen(true);
  };

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip={{ children: data.title, hidden: false }}
        onClick={handleClick}
        isActive={isActive}
        className="justify-center"
      >
        <Icon className="w-4 h-4" />
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
