import { useAppSidebarContext } from '@app-sidebar';
import { ConversationDetailSidebar } from '@conversation-detail-sidebar';

import { ConversationThumbnail } from './conversation-thumbnail';
import { ConversationDetail } from '../types/conversation-detail';

interface ConversationHeaderProps {
  data: ConversationDetail;
}

export const ConversationHeader = ({ data }: ConversationHeaderProps) => {
  const { openDetail } = useAppSidebarContext();

  return (
    <button
      onClick={() => openDetail(<ConversationDetailSidebar data={data} />)}
      className="bg-background border-b px-4 py-2 flex items-center gap-3 cursor-pointer"
    >
      <ConversationThumbnail data={data} />

      <div className="flex flex-col gap-0.5 flex-1 min-w-0 text-left">
        <span className="text-foreground truncate font-medium text-sm">
          {data.title}
        </span>
        <span className="line-clamp-1 text-xs text-muted-foreground">
          {data.users.map((u) => u.name || 'VelonY User').join(', ')}
        </span>
      </div>
    </button>
  );
};
