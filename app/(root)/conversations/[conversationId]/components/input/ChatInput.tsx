'use client';

import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { api } from '@/convex/_generated/api';
import { useConversation } from '@/hooks/useConversation';
import { useMutationState } from '@/hooks/UseMutationState';
import { zodResolver } from '@hookform/resolvers/zod';
import { ConvexError } from 'convex/values';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from '@/components/ui/button';
import { SendHorizonal } from 'lucide-react';
import MessageActionsPopover from './MessageActionsPopover';
import EmojiPicker, { Theme } from 'emoji-picker-react';

const chatMessageSchema = z.object({
  content: z.string().min(1, { message: 'This field cannot be empty' }),
});

const ChatInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const emojiPickerRef = useRef<any>(null);

  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  let theme: unknown;
  const [cursorPosition, setCursorPosition] = useState(0);

  const { conversationId } = useConversation();

  const { mutate: createMessage, pending } = useMutationState(
    api.message.create,
  );

  const form = useForm<z.infer<typeof chatMessageSchema>>({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: {
      content: '',
    },
  });

  const handleSubmit = async (values: z.infer<typeof chatMessageSchema>) => {
    createMessage({
      conversationId,
      type: 'text',
      content: [values.content],
    })
      .then(() => {
        form.reset();
        textareaRef.current?.focus();
      })
      .catch((error) => {
        toast.error(
          error instanceof ConvexError
            ? error.data
            : 'Unexpected error occurred',
        );
      });
  };

  // Watch the form content and its initial values
  const content = form.watch('content', '');

  const insertEmoji = (emoji: string) => {
    const newText = [
      content.substring(0, cursorPosition),
      emoji,
      content.substring(cursorPosition),
    ].join('');

    // Set the form content and its current text
    form.setValue('content', newText);

    setCursorPosition(cursorPosition + emoji.length);
  };

  // Close the emoji
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setEmojiPickerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get the value & place of the cursor inside the form
  const handleInputChange = (event: any) => {
    event.preventDefault();
    const { value, selectionStart } = event.target;

    // If not null, update the value of form
    if (selectionStart !== null) {
      form.setValue('content', value);
      setCursorPosition(selectionStart);
    }
  };

  return (
    <Card className="w-full p-2 rounded-lg relative">
      <div className="flex gap-2 items-end w-full">
        {/* Emoji Picker */}
        <div className="absolute bottom-16" ref={emojiPickerRef}>
          <EmojiPicker
            open={emojiPickerOpen}
            theme={theme as Theme}
            onEmojiClick={(emojiDetails) => {
              insertEmoji(emojiDetails.emoji);
              setEmojiPickerOpen(false);
            }}
            lazyLoadEmojis
          />
        </div>

        <MessageActionsPopover setEmojiPickerOpen={setEmojiPickerOpen} />
        <Form {...form}>
          <form
            className="flex gap-2 items-end w-full"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => {
                return (
                  <FormItem className="h-full w-full">
                    <FormControl>
                      <TextareaAutosize
                        onKeyDown={async (e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            await form.handleSubmit(handleSubmit)();
                          }
                        }}
                        rows={1}
                        maxRows={3}
                        {...field}
                        onChange={(e) => handleInputChange(e)}
                        onClick={(e) => handleInputChange(e)}
                        placeholder="Type a message..."
                        className="min-h-full w-full resize-none border-0 outline-0 bg-card text-card-foreground placeholder:text-muted-foreground p-1.5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button disabled={pending} type="submit" size="icon">
              <SendHorizonal />
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
};

export default ChatInput;
