export type ConversationSummary = {
  id: string;
  title: string;
  thumbnailUrl: string | null;
  url: string;
  lastMessage: {
    id: string;
    content: string;
    userName: string | null;
    createdAt: Date;
    updatedAt: Date;
  } | null;
};
