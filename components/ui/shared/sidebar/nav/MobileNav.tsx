'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useConversation } from '@/hooks/useConversation';
import { useNavigation } from '@/hooks/useNavigation';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { ToggleTheme } from '../../themes/toggle-theme';
import { Badge } from '@/components/ui/badge';

const MobileNav = () => {
  const { paths } = useNavigation();
  const { isActive } = useConversation();

  if (isActive) return null;

  return (
    <Card className="fixed bottom-4 w-[calc(100vw-32px)] flex items-center h-16 p-2 lg:hidden">
      <nav className="w-full">
        <ul className="flex justify-evenly items-center gap-4">
          {paths.map((path, id) => (
            <li key={id} className="relative">
              <Link href={path.href}>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      size="icon"
                      variant={path.active ? 'default' : 'outline'}
                    >
                      {path.icon}
                    </Button>
                  </TooltipTrigger>
                  {path.count ? (
                    <Badge className="absolute left-6 bottom-4 px-2 rounded-full">
                      {path.count}
                    </Badge>
                  ) : null}
                  <TooltipContent>
                    <p>{path.name}</p>
                  </TooltipContent>
                </Tooltip>
              </Link>
            </li>
          ))}
          <ToggleTheme />
          <li className="flex items-center">
            <UserButton />
          </li>
        </ul>
      </nav>
    </Card>
  );
};

export default MobileNav;
