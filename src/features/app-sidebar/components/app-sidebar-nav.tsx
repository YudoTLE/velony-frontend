'use client';

import { ConversationSidebar } from '@conversation-sidebar';
import { UserIconSelf } from '@shared/components/icon/user-icon';
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from '@shared/components/ui/sidebar';
import { Bot, Cpu, MessageSquareMore } from 'lucide-react';
import * as React from 'react';

import { AppSidebarNavItem } from './app-sidebar-nav-item';
import { ProfileSidebar } from '../../profile-sidebar/components/profile-sidebar';
import { SidebarItem } from '../types/sidebar-item';

const navMain: SidebarItem[] = [
  {
    id: 'conversations',
    title: 'Conversations',
    icon: MessageSquareMore,
    renderContent: () => <ConversationSidebar />,
  },
  {
    id: 'characters',
    title: 'Characters',
    icon: Bot,
  },
  {
    id: 'models',
    title: 'Models',
    icon: Cpu,
  },
];

const navFooter: SidebarItem[] = [
  {
    id: 'profiles',
    title: 'Profiles',
    icon: UserIconSelf,
    renderContent: () => <ProfileSidebar />,
  },
];

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

export { navMain, navFooter };
