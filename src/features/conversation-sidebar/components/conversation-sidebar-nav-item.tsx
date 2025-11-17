import type { ConversationSummary } from '@conversation';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@shared/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

interface ConversationSidebarNavItemProps {
  data: ConversationSummary;
}

export const ConversationSidebarNavItem = ({
  data,
}: ConversationSidebarNavItemProps) => {
  return (
    <Link
      href={data.url}
      className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex items-center gap-2 border-b px-3 py-2 text-sm leading-tight first:border-t text-muted-foreground"
    >
      <Avatar className="size-10 shrink-0">
        <AvatarImage src={data.thumbnailUrl || undefined} alt={data.title} />
        <AvatarFallback>{data.title.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <div className="flex w-full items-center gap-2">
          <span className="text-foreground truncate">{data.title}</span>
          <span className="ml-auto text-[8px] shrink-0">
            {data.lastMessage?.updatedAt &&
              formatDistanceToNow(new Date(data.lastMessage?.updatedAt), {
                addSuffix: true,
              })}
          </span>
        </div>
        <span className="line-clamp-1 text-xs">
          {data.lastMessage
            ? `${data.lastMessage.senderName}: ${data.lastMessage.content}`
            : '-- no message --'}
        </span>
      </div>
    </Link>
  );
};
