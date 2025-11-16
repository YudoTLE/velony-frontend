'use client';

import { Button } from '@shared/components/ui/button';
import { Sidebar, useSidebar } from '@shared/components/ui/sidebar';
import { X } from 'lucide-react';
import React from 'react';

import { AppSidebarNav } from './app-sidebar-nav';
import { AppSidebarNavLogo } from './app-sidebar-nav-logo';
import { useAppSidebarContext } from './app-sidebar-provider';

export const AppSidebar: React.FC = () => {
  const { activeItem, isOpen, setIsOpen } = useAppSidebarContext();
  const { setOpen } = useSidebar();

  const handleClose = () => {
    setIsOpen(false);
    setOpen(false);
  };

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
        {isOpen && activeItem && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-50 h-8 w-8"
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
            </Button>
            {activeItem.renderContent?.()}
          </>
        )}
      </Sidebar>
    </>
  );
};
