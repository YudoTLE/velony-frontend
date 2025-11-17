export type ConversationDetail = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string | null;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  users: Array<{
    id: string;
    name: string;
    username: string;
    avatarUrl: string | null;
    role: 'owner' | 'admin' | 'member';
  }> | null;
};
