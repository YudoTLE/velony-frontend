import { SidebarContent, SidebarGroup } from '@shared/components/ui/sidebar';
import { Settings, User2 } from 'lucide-react';

import { ProfileSidebarNavItem } from './profile-sidebar-nav-item';

const list = [
  { title: 'Account', url: '/profiles/account', icon: User2 },
  { title: 'Setting', url: '/profiles/setting', icon: Settings },
];

export const ProfileSidebarNav = () => {
  return (
    <SidebarContent className="gap-0">
      <SidebarGroup className="px-0">
        {list.map((item) => (
          <ProfileSidebarNavItem key={item.title} data={item} />
        ))}
      </SidebarGroup>
    </SidebarContent>
  );
};
