'use client';

import { useAppSidebarContext } from '@app-sidebar';
import { Button } from '@shared/components/ui/button';
import { Sidebar } from '@shared/components/ui/sidebar';
import { X } from 'lucide-react';

export const AppSidebarRight = () => {
  const { detail, isDetailOpen, closeDetail } = useAppSidebarContext();

  return (
    <>
      <Sidebar
        side="right"
        collapsible="offcanvas"
        className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      >
        {isDetailOpen && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 left-2 z-50 size-8"
              onClick={closeDetail}
            >
              <X className="size-4" />
            </Button>
            {detail}
          </>
        )}
      </Sidebar>
    </>
  );
};
