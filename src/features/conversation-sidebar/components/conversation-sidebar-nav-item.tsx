import { ConversationThumbnail, type ConversationSummary } from '@conversation';
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
      className="h-15 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex items-center gap-2 border-b px-3 py-2 text-sm leading-tight first:border-t text-muted-foreground"
    >
      <ConversationThumbnail data={data} />
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
            ? `${data.lastMessage.userName}: ${data.lastMessage.content}`
            : '-- no message --'}
        </span>
      </div>
    </Link>
  );
};
