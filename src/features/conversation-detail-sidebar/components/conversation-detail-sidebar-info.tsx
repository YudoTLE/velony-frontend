import type { ConversationDetail } from '@conversation';
import { SidebarGroupContent } from '@shared/components/ui/sidebar';

interface ConversationDetailSidebarInfoProps {
  data: ConversationDetail;
}

export const ConversationDetailSidebarInfo = ({
  data,
}: ConversationDetailSidebarInfoProps) => {
  return (
    <>
      <SidebarGroupContent className="px-4 py-2">
        <p className="text-sm text-muted-foreground">
          {data.description || 'No description'}
        </p>
      </SidebarGroupContent>
    </>
  );
};
