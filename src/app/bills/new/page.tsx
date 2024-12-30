import Link from 'next/link';

import { CreateBill } from '@/app/bills/new/form/CreateBill';
import { BackIcon } from '@/assets/icons/back';
import { cn } from '@/lib/utils';

const NewBills = async () => {
  return (
    <section className="max-w-screen-sm mx-auto px-4 mt-16">
      <section
        className={cn(
          'fixed',
          'top-0',
          'left-0',
          'w-full',
          'h-14',
          'flex',
          'items-center',
          'p-4',
          'bottom-0',
          'border',
          'border-b',
          'border-solid',
          'border-primary/[0.1]',
          'bg-bgWhite',
        )}
      >
        <Link href="/bills">
          <BackIcon />
        </Link>
      </section>
      <CreateBill />
    </section>
  );
};

export default NewBills;
