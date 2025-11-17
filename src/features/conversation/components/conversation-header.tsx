import type { ConversationSummary } from '@conversation';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@shared/components/ui/avatar';

import { ConversationDetail } from '../types/conversation-detail';

interface ConversationHeaderProps {
  data: ConversationDetail;
}

export const ConversationHeader = ({ data }: ConversationHeaderProps) => {
  return (
    <div className="bg-background border-b px-4 py-2 flex items-center gap-3">
      <Avatar className="size-9 shrink-0">
        <AvatarImage src={data.thumbnailUrl || undefined} alt={data.title} />
        <AvatarFallback>{data.title.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="text-foreground truncate font-medium text-sm">
          {data.title}
        </span>
        <span className="line-clamp-1 text-xs text-muted-foreground">
          {data.users.map((u) => u.name || 'VelonY User').join(', ')}
        </span>
      </div>
    </div>
  );
};
