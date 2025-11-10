import { Message } from './message';

export type Conversation = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string | null;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  lastMessage?: Message;
};
