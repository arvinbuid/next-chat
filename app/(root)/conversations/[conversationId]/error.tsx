'use client';

import ConversationFallback from '@/components/ui/shared/conversation/ConversationFallback';
import Error from 'next/error';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ErrorPage({ error }: { error: Error }) {
  const router = useRouter();

  useEffect(() => {
    router.push('/conversations');
  }, [error, router]);

  return <ConversationFallback />;
}
