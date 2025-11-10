'use client';

import React from 'react';
import { Sidebar } from '@shared/components/ui/sidebar';

import { AppSidebarNav } from './app-sidebar-nav';
import { AppSidebarNavLogo } from './app-sidebar-nav-logo';
import { useAppSidebarContext } from './app-sidebar-provider';

export const AppSidebar: React.FC = () => {
  const { activeItem } = useAppSidebarContext();

  return (
    <>
      <Sidebar
        collapsible="icon"
        className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      >
        <Sidebar
          collapsible="none"
          className="w-[calc(var(--sidebar-width-icon)+1px)] border-r"
        >
          <AppSidebarNavLogo />
          <AppSidebarNav />
        </Sidebar>
        {activeItem ? (
          <>{activeItem.renderContent?.()}</>
        ) : (
          <div className="p-4 text-muted-foreground text-sm">
            Select an item from the navigation
          </div>
        )}
      </Sidebar>
    </>
  );
};
