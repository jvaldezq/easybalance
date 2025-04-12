import Link from 'next/link';
import { Suspense } from 'react';

import { BillCardLoader } from '@/app/expense/components/BillCardLoader';
import { BillList } from '@/app/expense/components/BillList';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const revalidate = 0;

const Expense = async () => {
  return (
    <section className="relative">
      <Suspense fallback={<BillCardLoader />}>
        <BillList />
      </Suspense>
      <Link href="/expense/new">
        <Button
          variant="outline"
          className={cn(
            'bg-tertiary',
            'hover:bg-white',
            'hover:text-tertiary',
            'left-0',
            'right-0',
            'text-white',
            'text-sm',
            'font-bold',
            'fixed',
            'mx-auto',
            'bottom-24',
            'w-1/2',
            'rounded-3xl',
            'animate-fade-down animate-duration-[1500ms] animate-ease-in-out',
          )}
        >
          Crear gasto
        </Button>
      </Link>
    </section>
  );
};

export default Expense;
