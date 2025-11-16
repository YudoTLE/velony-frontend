import { Input } from '@shared/components/ui/input';
import { SidebarHeader } from '@shared/components/ui/sidebar';
import { Search } from 'lucide-react';

export const ConversationSidebarHeader = () => {
  return (
    <SidebarHeader className="border-b px-4 py-2">
      <div className="font-semibold text-lg">VelonY</div>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search or start new conversation..."
          className="pl-8 text-sm rounded-full"
        />
      </div>
    </SidebarHeader>
  );
};
