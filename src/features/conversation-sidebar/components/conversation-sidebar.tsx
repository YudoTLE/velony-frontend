import { Sidebar } from '@shared/components/ui/sidebar';
import type { Conversation } from '@shared/schemas/conversation.schema';

import { ConversationSidebarHeader } from './conversation-sidebar-header';
import { ConversationSidebarNav } from './conversation-sidebar-nav';

interface ConversationSidebarProps {
  list: Conversation[];
}

export const ConversationSidebar = ({
  list = [],
}: ConversationSidebarProps) => {
  return (
    <Sidebar collapsible="none" className="hidden flex-1 md:flex">
      <ConversationSidebarHeader />

      <ConversationSidebarNav list={list} />
    </Sidebar>
  );
};
