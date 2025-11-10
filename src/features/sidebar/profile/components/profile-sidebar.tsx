import { UserIconSelf } from '../../../../shared/components/icon/user-icon';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from '@shared/components/ui/sidebar';
import { useUsersMeQuery } from '@/features/user/queries/use-users-me-query';

export const ProfileSidebar = () => {
  const { data: user } = useUsersMeQuery();

  return (
    <Sidebar collapsible="none" className="hidden flex-1 md:flex">
      <SidebarHeader className="border-b px-4 py-2">
        <div className="font-semibold text-lg">Profile</div>
      </SidebarHeader>

      <SidebarContent className="gap-0">
        <SidebarGroup className="px-0">
          <SidebarGroupContent className="p-3 space-y-1">
            <UserIconSelf className="size-20" />
          </SidebarGroupContent>
          <SidebarGroupContent className="p-3 space-y-1">
            <div className="text-muted-foreground">Username</div>
            <div>{user?.username}</div>
          </SidebarGroupContent>
          <SidebarGroupContent className="p-3 space-y-1">
            <div className="text-muted-foreground">Name</div>
            <div>{user?.name}</div>
          </SidebarGroupContent>
          <SidebarGroupContent className="p-3 space-y-1">
            <div className="text-muted-foreground">Email</div>
            <div>{user?.email}</div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
