import { Search } from 'lucide-react';

import { ConversationSidebarItem } from './conversation-sidebar-item'; // import your item component

import { Input } from '@shared/components/ui/input';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
} from '@shared/components/ui/sidebar';
import type { Conversation } from '@shared/schemas/conversation.schema';

interface ConversationSidebarProps {
  list: Conversation[];
}

export const ConversationSidebar = ({
  list = [],
}: ConversationSidebarProps) => {
  return (
    <Sidebar collapsible="none" className="hidden flex-1 md:flex">
      <SidebarHeader className="border-b px-4 py-2">
        <div className="font-semibold text-lg">VelonY</div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search or start new conversation..."
            className="pl-8 text-sm rounded-full"
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-0">
        <SidebarGroup className="px-0">
          {list.map((conversation) => (
            <ConversationSidebarItem
              key={conversation.id}
              data={conversation}
            />
          ))}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
