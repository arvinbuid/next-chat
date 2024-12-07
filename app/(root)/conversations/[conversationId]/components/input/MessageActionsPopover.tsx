import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { PopoverClose } from '@radix-ui/react-popover';
import { PlusCircle, Smile } from 'lucide-react';
import React from 'react';

type Props = {};

const MessageActionsPopover = (props: Props) => {
  return (
    <Popover>
      <PopoverContent className="w-full mb-1 flex flex-col gap-2">
        <PopoverClose>
          <Button variant="outline" onClick={() => {}} size="icon">
            <Smile />
          </Button>
        </PopoverClose>
      </PopoverContent>
      <PopoverTrigger asChild>
        <Button size="icon" variant="secondary">
          <PlusCircle />
        </Button>
      </PopoverTrigger>
    </Popover>
  );
};

export default MessageActionsPopover;
