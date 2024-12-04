'use client';

import ConversationContainer from '@/components/ui/shared/conversation/ConversationContainer';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { Loader2 } from 'lucide-react';
import React from 'react';
import Header from './components/Header';
import Body from './components/body/Body';
import ChatInput from './components/input/ChatInput';

type Props = {
  params: {
    conversationId: Id<'conversations'>;
  };
};

const ConversationPage = ({ params: { conversationId } }: Props) => {
  const conversation = useQuery(api.conversation.get, { id: conversationId });

  return conversation === undefined ? (
    <div className="w-full h-full flex justify-center items-center">
      <Loader2 />
    </div>
  ) : conversation === null ? (
    <p className="w-full h-full flex items-center justify-center">
      Conversation not found
    </p>
  ) : (
    <ConversationContainer>
      <Header
        name={
          (conversation.isGroup
            ? conversation.name
            : conversation.otherMember.username) || ''
        }
        imageUrl={
          conversation.isGroup ? undefined : conversation.otherMember.imageUrl
        }
      />
      <Body />
      <ChatInput />
    </ConversationContainer>
  );
};

export default ConversationPage;
