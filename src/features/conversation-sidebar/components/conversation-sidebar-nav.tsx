import { useConversationListQuery } from '@conversation';
import { ScrollArea } from '@shared/components/ui/scroll-area';
import { SidebarContent, SidebarGroup } from '@shared/components/ui/sidebar';

import { ConversationSidebarNavItem } from './conversation-sidebar-nav-item';
import { ConversationSidebarNavItemSkeleton } from './conversation-sidebar-nav-item-skeleton';

export const ConversationSidebarNav = () => {
  const { data: list = [], isPending } = useConversationListQuery();

  return (
    <SidebarContent className="gap-0 p-0 flex-1">
      <ScrollArea className="h-full">
        <SidebarGroup className="p-0 pb-10">
          {isPending ? (
            <>
              {Array.from({ length: 15 }).map((_, index) => (
                <ConversationSidebarNavItemSkeleton key={index} />
              ))}
            </>
          ) : (
            list.map((conversation) => (
              <ConversationSidebarNavItem
                key={conversation.id}
                data={conversation}
              />
            ))
          )}
        </SidebarGroup>
      </ScrollArea>
    </SidebarContent>
  );
};
