'use client';
import { usePathname, useRouter } from 'next/navigation';

import { BackIcon } from '@/assets/icons/back';
import { cn } from '@/lib/utils';

const BackHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
  const paths = pathname.split('/');

  if (paths.length <= 2) {
    return null;
  }

  return (
    <section
      className={cn(
        'fixed',
        'top-0',
        'left-0',
        'w-full',
        'h-12',
        'flex',
        'items-center',
        'p-4',
        'bottom-0',
        'border',
        'border-b',
        'border-solid',
        'border-primary/[0.1]',
        'bg-bgWhite',
        'z-10',
      )}
    >
      <BackIcon onClick={() => router.back()} />
    </section>
  );
};

export default BackHeader;
