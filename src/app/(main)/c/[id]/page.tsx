'use client';

import { useParams } from 'next/navigation';

import { Conversation } from '@/features/conversation/components/conversation';

export default function ConversationPage() {
  const { id } = useParams();

  return <Conversation id={id as string} />;
}
