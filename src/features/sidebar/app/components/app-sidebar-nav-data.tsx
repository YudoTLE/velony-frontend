import { MessageSquareMore, Bot, Cpu, Settings } from 'lucide-react';

import { ProfileSidebar } from '../../profile/components/profile-sidebar';

import { SidebarItem } from '@/features/sidebar/app/types/sidebar-item';
import { UserIconSelf } from '@shared/components/icon/user-icon';
import { ConversationSidebar } from '@/features/sidebar/conversation/components/conversation-sidebar';
import { Conversation } from '@shared/schemas/conversation.schema';
import { Message } from '@shared/schemas/message.schema';

// Mock data - move this to appropriate data fetching layer later
const message: Message = {
  id: '000',
  senderId: '000',
  senderName: 'YudoTLE',
  content: 'This conversation shit is for testing purpose',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const conversation: Conversation = {
  id: '000',
  title: 'Testing Purpose',
  description: 'This conversation shit is for testing purpose',
  thumbnailUrl: 'https',
  url: 'https',
  createdAt: new Date(),
  updatedAt: new Date(),
  lastMessage: message,
};

const conversationList = [conversation, conversation];

export const navMain: SidebarItem[] = [
  {
    id: 'conversations',
    title: 'Conversations',
    icon: MessageSquareMore,
    renderContent: () => <ConversationSidebar list={conversationList} />,
  },
  {
    id: 'agents',
    title: 'Agents',
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
    id: 'settings',
    title: 'Settings',
    icon: Settings,
  },
  {
    id: 'profiles',
    title: 'Profiles',
    icon: UserIconSelf,
    renderContent: () => <ProfileSidebar />,
  },
];
