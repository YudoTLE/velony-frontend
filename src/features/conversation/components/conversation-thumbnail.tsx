import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@shared/components/ui/avatar';
import { cn } from '@shared/lib/utils';

interface ConversationSidebarNavItemProps {
  data: { thumbnailUrl: string | null; title?: string };
  className?: string;
  size?: number | string;
}

export const ConversationThumbnail = ({
  data,
  className,
  size = 40,
}: ConversationSidebarNavItemProps) => {
  const dimension = typeof size === 'number' ? `${size}px` : size;

  return (
    <Avatar
      className={cn('shrink-0', className)}
      style={{ width: dimension, height: dimension }}
    >
      <AvatarImage
        src={data.thumbnailUrl || undefined}
        alt={data.title || 'conversation thumbnail'}
      />
      <AvatarFallback
        className="text-primary-foreground flex items-center justify-center"
        style={{ fontSize: `calc(${dimension} * 0.4)` }}
      >
        {data.title?.slice(0, 2).toUpperCase() || '?'}
      </AvatarFallback>
    </Avatar>
  );
};
