import { SidebarProvider } from '@shared/components/ui/sidebar';
import { ConversationSidebar } from '@/features/sidebar/conversation/components/conversation-sidebar';
import { Conversation } from '@/types/conversation';
import { Message } from '@/types/message';

const message: Message = {
  id: '000',
  senderName: 'YudoTLE',
  content: 'This conversation shit is for testing purpose',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const conversation: Conversation = {
  id: '000',
  title: 'Testing Purpose',
  description: 'This conversation shit is for testing purpose',
  groupPictureUrl: 'https',
  url: 'https',
  createdAt: new Date(),
  updatedAt: new Date(),
  lastMessage: message,
};

const conversationList = [conversation, conversation];

export default function TestPage() {
  return (
    <>
      <SidebarProvider>
        <ConversationSidebar list={conversationList} />
      </SidebarProvider>
    </>
  );
}
