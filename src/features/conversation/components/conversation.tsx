import { ConversationHeader } from './conversation-header';
import { useConversationDetailQuery } from '../queries/use-conversation-detail-query';

interface ConversationHeaderProps {
  id: string;
}

export const Conversation = ({ id }: ConversationHeaderProps) => {
  const { data, isPending } = useConversationDetailQuery(id);

  return (
    <div className="flex flex-col h-screen">
      {data && <ConversationHeader data={data} />}
      <div className="flex-1 overflow-y-auto overscroll-none">
        {/* Message list goes here */}
      </div>
    </div>
  );
};
