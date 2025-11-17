'use client';

import { Card } from '@shared/components/ui/card';
import React from 'react';

import { NavSidebarContent } from './nav-sidebar-content';
import { NavSidebarFooter } from './nav-sidebar-footer';
import { NavSidebarHeader } from './nav-sidebar-header';

export const NavSidebar: React.FC = () => {
  return (
    <Card className="z-20 rounded-none p-0">
      <NavSidebarHeader />
      <NavSidebarContent />
      <NavSidebarFooter />
    </Card>
  );
};
