'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@shared/components/ui/avatar';
import { Skeleton } from '@shared/components/ui/skeleton';
import { useUsersMeQuery } from '@/features/user/queries/use-users-me-query';
import { cn } from '@shared/lib/utils';

interface UserIconSelfProps {
  className?: string;
}

export const UserIconSelf = ({ className }: UserIconSelfProps) => {
  const { data: user, isPending } = useUsersMeQuery();

  if (isPending) {
    return (
      <div className={cn('size-10', className)}>
        <Skeleton className="h-full w-full rounded-full aspect-square" />
      </div>
    );
  }

  return (
    <Avatar className={cn('size-10', className)}>
      {user?.avatarUrl ? (
        <AvatarImage src={user.avatarUrl} alt={user?.name ?? 'User Avatar'} />
      ) : (
        <AvatarFallback>{user?.name?.[0]?.toUpperCase() ?? '?'}</AvatarFallback>
      )}
    </Avatar>
  );
};
