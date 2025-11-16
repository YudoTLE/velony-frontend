import { UserIconSelf } from '@shared/components/icon/user-icon';
import { SidebarGroupContent } from '@shared/components/ui/sidebar';
import { Skeleton } from '@shared/components/ui/skeleton';
import { useUsersMeQuery } from '@user';

export const ProfileSidebarMain = () => {
  const { data: user, isPending } = useUsersMeQuery();

  return (
    <SidebarGroupContent className="p-3 space-y-1 flex flex-col items-center">
      {/* Avatar */}
      <UserIconSelf className="size-30" />

      <div className="flex flex-col items-center mt-2">
        {/* Name */}
        {isPending ? (
          <Skeleton className="h-5 w-32 mt-2" />
        ) : (
          <div className="text-xl font-semibold">{user?.name}</div>
        )}

        {/* Username */}
        {isPending ? (
          <Skeleton className="h-4 w-24 mt-1" />
        ) : (
          <div className="text-md text-muted-foreground">{user?.username}</div>
        )}
      </div>
    </SidebarGroupContent>
  );
};
