import { ConversationThumbnail, type ConversationDetail } from '@conversation';
import { SidebarGroupContent } from '@shared/components/ui/sidebar';

interface ConversationDetailSidebarHeaderProps {
  data: ConversationDetail;
}

export const ConversationDetailSidebarHeader = ({
  data,
}: ConversationDetailSidebarHeaderProps) => {
  return (
    <SidebarGroupContent className="p-3 space-y-1 flex flex-col items-center">
      {/* Thumbnail */}
      <ConversationThumbnail data={data} size={120} />

      <div className="flex flex-col items-center mt-2 w-full px-2">
        {/* Title */}
        <div className="text-xl font-semibold text-center">{data.title}</div>
      </div>
    </SidebarGroupContent>
  );
};
