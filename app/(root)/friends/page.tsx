'use client';

import ConversationFallback from '@/components/ui/shared/conversation/ConversationFallback';
import ItemList from '@/components/ui/shared/item-list/ItemList';
import React from 'react';
import AddFriendDialog from './_components/AddFriendDialog';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Loader2 } from 'lucide-react';
import Request from './_components/Request';

const Friends = () => {
  const requests = useQuery(api.requests.get);

  return (
    <>
      <ItemList title="Friends" action={<AddFriendDialog />}>
        {requests ? (
          requests.length === 0 ? (
            <p className="h-full w-full flex items-center justify-center">
              No friend requests
            </p>
          ) : (
            requests.map((request) => (
              <Request
                key={request.request._id}
                id={request.request._id}
                imageUrl={request.sender.imageUrl}
                username={request.sender.username}
                email={request.sender.email}
              />
            ))
          )
        ) : (
          <Loader2 />
        )}
      </ItemList>
      <ConversationFallback />
    </>
  );
};

export default Friends;
