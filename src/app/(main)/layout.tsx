import { SidebarProvider } from '@shared/components/ui/sidebar';
import { AppSidebar } from '@sidebar/app/components/app-sidebar';
import { AppSidebarProvider } from '@sidebar/app/components/app-sidebar-provider';
import { getActiveSidebarItem } from '@sidebar/app/lib/get-active-sidebar-item';

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialActiveItem = await getActiveSidebarItem();

  return (
    <>
      <SidebarProvider
        style={
          {
            '--sidebar-width': '350px',
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
