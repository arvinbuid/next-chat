'use client';

import React from 'react';
import { Card } from '../../card';
import { cn } from '@/lib/utils';
import { useConversation } from '@/hooks/useConversation';

type Props = React.PropsWithChildren<{
  title: string;
  action?: React.ReactNode;
}>;

const ItemList = ({ title, action: Action, children }: Props) => {
  const { isActive } = useConversation();
  return (
    <Card
      className={cn('hidden h-full w-full lg:flex-none lg:w-80 p-4', {
        block: !isActive,
        'lg:block': isActive,
      })}
    >
      <div className=" mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">
          {title}
          {Action ? Action : null}
        </h1>
      </div>
      <div className="w-full h-full flex flex-col justify-start items-center gap-2">
        {children}
      </div>
    </Card>
  );
};

export default ItemList;
