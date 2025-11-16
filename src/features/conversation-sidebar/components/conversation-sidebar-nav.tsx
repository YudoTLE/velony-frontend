import { useConversationListQuery } from '@conversation';
import { SidebarContent, SidebarGroup } from '@shared/components/ui/sidebar';

import { ConversationSidebarNavItem } from './conversation-sidebar-nav-item';

export const ConversationSidebarNav = () => {
  const { data: list = [] } = useConversationListQuery();

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
