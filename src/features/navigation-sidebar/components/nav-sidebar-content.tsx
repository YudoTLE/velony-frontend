'use client';

import { ConversationSidebar } from '@conversation-sidebar';
import { UserIconSelf } from '@shared/components/icon/user-icon';
import { CardContent } from '@shared/components/ui/card';
import { Bot, Cpu, MessageSquareMore } from 'lucide-react';
import * as React from 'react';

import { NavSidebarItem } from './nav-sidebar-item';
import { ProfileSidebar } from '../../profile-sidebar/components/profile-sidebar';

const navMain = [
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

const navFooter = [
  {
    id: 'profiles',
    title: 'Profiles',
    icon: UserIconSelf,
    renderContent: () => <ProfileSidebar />,
  },
];

export const NavSidebarContent = () => {
  return (
    <>
      <CardContent className="p-0">
        {navMain.map((item) => (
          <NavSidebarItem key={item.id} data={item} />
        ))}
      </CardContent>
    </>
  );
};

export { navMain, navFooter };
