'use client';

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@shared/components/ui/sidebar';
import Image from 'next/image';
import Link from 'next/link';

export const AppSidebarNavLogo = () => {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
            <Link href="/">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                <Image
                  src="/images/velony-icon.png"
                  alt="Velony Icon"
                  width={28}
                  height={28}
                />
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};
