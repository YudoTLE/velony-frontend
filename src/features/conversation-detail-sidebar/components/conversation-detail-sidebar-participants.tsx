import type { ConversationDetail } from '@conversation';
import {
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@shared/components/ui/sidebar';

import { ConversationDetailSidebarParticipantItem } from './conversation-detail-sidebar-participant-item';

interface ConversationDetailSidebarParticipantsProps {
  data: ConversationDetail;
}

export const ConversationDetailSidebarParticipants = ({
  data,
}: ConversationDetailSidebarParticipantsProps) => {
  return (
    <>
      <SidebarGroupLabel className="px-4 py-2 text-xs font-semibold">
        Participants ({data.users.length})
      </SidebarGroupLabel>
      <SidebarGroupContent>
        {data.users.map((user) => (
          <ConversationDetailSidebarParticipantItem
            key={user.username}
            data={user}
          />
        ))}
      </SidebarGroupContent>
    </>
  );
};
