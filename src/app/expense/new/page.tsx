import Link from 'next/link';

import { CreateExpense } from '@/app/expense/new/form/CreateExpense';
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
        )}
      >
        <Link href="/expense">
          <BackIcon />
        </Link>
      </section>
      <CreateExpense />
    </section>
  );
};

export default NewBills;
