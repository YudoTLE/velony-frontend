import { SidebarContent, SidebarGroup } from '@shared/components/ui/sidebar';
import type { Conversation } from '@shared/schemas/conversation.schema';

import { ConversationSidebarNavItem } from './conversation-sidebar-nav-item';

interface ConversationSidebarNavProps {
  list: Conversation[];
}

export const ConversationSidebarNav = ({
  list = [],
}: ConversationSidebarNavProps) => {
  return (
    <SidebarContent className="gap-0">
      <SidebarGroup className="px-0">
        {list.map((conversation) => (
          <ConversationSidebarNavItem
            key={conversation.id}
            data={conversation}
          />
        ))}
      </SidebarGroup>
    </SidebarContent>
  );
};
