'use client';

import * as React from 'react';

import { AppSidebarNavItem } from './app-sidebar-nav-item';
import { navMain, navFooter } from './app-sidebar-nav-data';

import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from '@shared/components/ui/sidebar';

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
