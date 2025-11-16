import { AppSidebar, AppSidebarProvider } from '@app-sidebar';
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
    <>
      <SidebarProvider
        defaultOpen={!!initialActiveItem}
        style={
          {
            '--sidebar-width': '400px',
          } as React.CSSProperties
        }
      >
        <AppSidebarProvider initialActiveItem={initialActiveItem}>
          <AppSidebar />
          {children}
        </AppSidebarProvider>
      </SidebarProvider>
    </>
  );
}
