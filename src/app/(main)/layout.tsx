import {
  AppSidebarLeft,
  AppSidebarProvider,
  AppSidebarRight,
} from '@app-sidebar';
import { SidebarProvider } from '@shared/components/ui/sidebar';
import { cookies } from 'next/headers';

const SIDEBAR_ACTIVE_ITEM_COOKIE = 'sidebar_active_item';

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const activeItemCookie = cookieStore.get(SIDEBAR_ACTIVE_ITEM_COOKIE);

  const initialActiveItem = activeItemCookie?.value || '';

  return (
    <SidebarProvider>
      <AppSidebarProvider initialActiveItem={initialActiveItem}>
        <AppSidebarLeft />
        <main className="flex-1">{children}</main>
        <AppSidebarRight />
      </AppSidebarProvider>
    </SidebarProvider>
  );
}
