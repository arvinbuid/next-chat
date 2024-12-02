import ConversationFallback from '@/components/ui/shared/conversation/ConversationFallback';
import ItemList from '@/components/ui/shared/item-list/ItemList';
import React from 'react';

type Props = {};

const Friends = (props: Props) => {
  return (
    <>
      <ItemList title="Friends">Friends Page</ItemList>
      <ConversationFallback />
    </>
  );
};

export default Friends;
