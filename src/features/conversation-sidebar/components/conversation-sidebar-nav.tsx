import { useConversationListQuery } from '@conversation';
import { ScrollArea } from '@shared/components/ui/scroll-area';
import { SidebarContent, SidebarGroup } from '@shared/components/ui/sidebar';

import { ConversationSidebarNavItem } from './conversation-sidebar-nav-item';

export const ConversationSidebarNav = () => {
  const { data: list = [] } = useConversationListQuery();

  return (
    <SidebarContent className="gap-0 p-0 flex-1">
      <ScrollArea className="h-full">
        <SidebarGroup className="px-0">
          {list.map((conversation) => (
            <ConversationSidebarNavItem
              key={conversation.id}
              data={conversation}
            />
          ))}
        </SidebarGroup>
      </ScrollArea>
    </SidebarContent>
  );
};
