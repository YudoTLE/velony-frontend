import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@shared/components/ui/avatar';

interface ConversationDetailSidebarParticipantItemProps {
  data: {
    name: string;
    username: string;
    avatarUrl: string | null;
    role: 'owner' | 'admin' | 'member';
  };
}

export const ConversationDetailSidebarParticipantItem = ({
  data,
}: ConversationDetailSidebarParticipantItemProps) => {
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'owner':
        return 'bg-blue-500/10 text-blue-500';
      case 'admin':
        return 'bg-purple-500/10 text-purple-500';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex items-center gap-2 border-b px-3 py-2 text-sm leading-tight first:border-t">
      <Avatar className="h-10 w-10 shrink-0">
        <AvatarImage src={data.avatarUrl || undefined} alt={data.name} />
        <AvatarFallback>{data.name[0]?.toUpperCase() || 'U'}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <span className="text-foreground truncate font-medium">
          {data.name || 'VelonY User'}
        </span>
        <span className="text-xs text-muted-foreground truncate">
          @{data.username}
        </span>
      </div>
      <span
        className={`ml-auto text-[10px] px-2 py-0.5 rounded-full shrink-0 ${getRoleBadgeColor(data.role)}`}
      >
        {data.role}
      </span>
    </div>
  );
};
