export type ConversationSummary = {
  id: string;
  title: string;
  thumbnailUrl: string | null;
  url: string;
  createdAt: Date;
  lastMessage: {
    id: string;
    content: string;
    senderName: string | null;
    updatedAt: Date;
  } | null;
};
