import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
} from '@shared/components/ui/sidebar';

import { ProfileSidebarHeader } from './profile-sidebar-header';
import { ProfileSidebarMain } from './profile-sidebar-main';
import { ProfileSidebarNav } from './profile-sidebar-nav';

export const ProfileSidebar = () => {
  return (
    <Sidebar collapsible="none" className="hidden flex-1 md:flex">
      <ProfileSidebarHeader />

      <SidebarContent className="gap-0">
        <SidebarGroup className="px-0">
          <ProfileSidebarMain />

          <ProfileSidebarNav />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
