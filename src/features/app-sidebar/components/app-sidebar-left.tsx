'use client';

import { useAppSidebarContext } from '@app-sidebar';
import { Button } from '@shared/components/ui/button';
import { Sidebar } from '@shared/components/ui/sidebar';
import { X } from 'lucide-react';

import { NavSidebar } from '@/features/navigation-sidebar';

export const AppSidebarLeft = () => {
  const { active, isOpen, close } = useAppSidebarContext();

  return (
    <>
      <Sidebar
        collapsible="icon"
        className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      >
        <NavSidebar />
        {isOpen && (
          <div className="bg-sidebar flex h-full flex-1 flex-col min-w-0">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-50 h-8 w-8"
              onClick={close}
            >
              <X className="size-4" />
            </Button>
            {active?.renderContent?.()}
          </div>
        )}
      </Sidebar>
    </>
  );
};
