import type { ConversationDetail } from '@conversation';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
} from '@shared/components/ui/sidebar';

import { ConversationDetailSidebarHeader } from './conversation-detail-sidebar-header';
import { ConversationDetailSidebarInfo } from './conversation-detail-sidebar-info';
import { ConversationDetailSidebarParticipants } from './conversation-detail-sidebar-participants';

interface ConversationDetailSidebarProps {
  data: ConversationDetail;
}

export const ConversationDetailSidebar = ({
  data,
}: ConversationDetailSidebarProps) => {
  return (
    <Sidebar
      collapsible="none"
      className="hidden flex-1 md:flex w-full min-w-0"
    >
      <SidebarContent className="gap-0">
        <SidebarGroup className="px-0">
          <ConversationDetailSidebarHeader data={data} />

          <ConversationDetailSidebarInfo data={data} />

          <ConversationDetailSidebarParticipants data={data} />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
