import { AppSidebar } from '@/features/sidebar/app/components/app-sidebar';
import { AppSidebarProvider } from '@/features/sidebar/app/components/app-sidebar-provider';
import { SidebarProvider } from '@shared/components/ui/sidebar';

export default function TestPage() {
  return (
    <>
      <SidebarProvider
        style={
          {
            '--sidebar-width': '350px',
          } as React.CSSProperties
        }
      >
        <AppSidebarProvider>
          <AppSidebar />
        </AppSidebarProvider>
      </SidebarProvider>
    </>
  );
}
