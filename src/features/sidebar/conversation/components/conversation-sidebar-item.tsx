import type { Conversation } from '@shared/schemas/conversation.schema';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

interface ConversationSidebarItemProps {
  data: Conversation;
}

export const ConversationSidebarItem = ({
  data,
}: ConversationSidebarItemProps) => {
  return (
    <div>
      <Link
        href={data.url}
        className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b px-4 py-3 text-sm leading-tight whitespace-nowrap last:border-b-0"
      >
        <div className="flex w-full items-center gap-2">
          <span>{data.title}</span>
          <span className="ml-auto text-xs">
            {data.lastMessage &&
              formatDistanceToNow(new Date(data.lastMessage.updatedAt), {
                addSuffix: true,
              })}
          </span>
        </div>
        <span className="line-clamp-1 w-[260px] text-xs whitespace-break-spaces">
          {data.lastMessage &&
            `${data.lastMessage.senderName}: ${data.lastMessage.content}`}
        </span>
      </Link>
    </div>
  );
};
