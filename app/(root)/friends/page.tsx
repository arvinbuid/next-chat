import ConversationFallback from '@/components/ui/shared/conversation/ConversationFallback';
import ItemList from '@/components/ui/shared/item-list/ItemList';
import React from 'react';
import AddFriendDialog from './_components/AddFriendDialog';

type Props = {};

const Friends = (props: Props) => {
  return (
    <>
      <ItemList title="Friends" action={<AddFriendDialog />}>
        Friends Page
      </ItemList>
      <ConversationFallback />
    </>
  );
};

export default Friends;
