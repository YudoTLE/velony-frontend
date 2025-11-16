'use client';

import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from '@shared/components/ui/sidebar';
import * as React from 'react';

import { navMain, navFooter } from './app-sidebar-nav-data';
import { AppSidebarNavItem } from './app-sidebar-nav-item';

export const AppSidebarNav = () => {
  return (
    <>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-1.5 md:px-0">
            <SidebarMenu>
              {navMain.map((item) => (
                <AppSidebarNavItem key={item.id} data={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-0">
        <SidebarGroup>
          <SidebarGroupContent className="px-1.5 md:px-0">
            <SidebarMenu>
              {navFooter.map((item) => (
                <AppSidebarNavItem key={item.id} data={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </>
  );
};
