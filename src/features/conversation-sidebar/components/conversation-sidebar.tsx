import { Sidebar } from '@shared/components/ui/sidebar';

import { ConversationSidebarHeader } from './conversation-sidebar-header';
import { ConversationSidebarNav } from './conversation-sidebar-nav';

export const ConversationSidebar = () => {
  return (
    <Sidebar collapsible="none" className="hidden flex-1 md:flex">
      <ConversationSidebarHeader />

      <ConversationSidebarNav />
    </Sidebar>
  );
};
