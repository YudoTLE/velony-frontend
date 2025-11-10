import React from 'react';

import { useAppSidebarContext } from './app-sidebar-provider';

import {
  SidebarMenuItem,
  SidebarMenuButton,
} from '@shared/components/ui/sidebar';
import { SidebarItem } from '@/features/sidebar/app/types/sidebar-item';

interface AppSidebarNavItemProps {
  data: SidebarItem;
}

export const AppSidebarNavItem = ({ data }: AppSidebarNavItemProps) => {
  const { activeItem, handleActiveItemChange } = useAppSidebarContext();
  const Icon = data.icon;
  const isActive = activeItem.id === data.id;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip={{ children: data.title, hidden: false }}
        onClick={() => handleActiveItemChange(data.id)}
        isActive={isActive}
        className="justify-center"
      >
        <Icon className="w-4 h-4" />
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
