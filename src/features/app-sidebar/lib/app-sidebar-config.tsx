import { ConversationSidebar } from '@conversation-sidebar';
import { ProfileSidebar } from '@profile-sidebar';
import { UserIconSelf } from '@shared/components/icon/user-icon';
import { convertTime } from '@shared/lib/time';
import { Bot, Cpu, MessageSquareMore } from 'lucide-react';

import type { AppSidebarItem } from '../types/app-sidebar-item';

export const APP_SIDEBAR_ACTIVE_COOKIE = 'sidebar_active_item';

export const APP_SIDEBAR_ACTIVE_MAX_AGE = convertTime('7d').seconds;

export const APP_SIDEBAR_NAV_MAIN: AppSidebarItem[] = [
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

export const APP_SIDEBAR_NAV_FOOTER: AppSidebarItem[] = [
  {
    id: 'profiles',
    title: 'Profiles',
    icon: UserIconSelf,
    renderContent: () => <ProfileSidebar />,
  },
];
