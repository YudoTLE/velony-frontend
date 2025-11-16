import { ConversationSidebar } from '@conversation-sidebar';
import { UserIconSelf } from '@shared/components/icon/user-icon';
import { Message } from '@shared/types/message';
import { MessageSquareMore, Bot, Cpu } from 'lucide-react';

import { ProfileSidebar } from '../../../profile-sidebar/components/profile-sidebar';

import { SidebarItem } from '@/features/sidebar/app/types/sidebar-item';

// Mock data - move this to appropriate data fetching layer later
const message: Message = {
  id: '000',
  senderId: '000',
  senderName: 'YudoTLE',
  content: 'This conversation shit is for testing purpose',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const navMain: SidebarItem[] = [
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

export const navFooter: SidebarItem[] = [
  {
    id: 'profiles',
    title: 'Profiles',
    icon: UserIconSelf,
    renderContent: () => <ProfileSidebar />,
  },
];
