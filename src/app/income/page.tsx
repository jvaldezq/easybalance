import Link from 'next/link';
import { Suspense } from 'react';

import { Filters } from '@/app/income/Filters';
import { IncomeList } from '@/app/income/IncomeList';
import { ExpenseCardLoader } from '@/components/ExpenseCardLoader';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  params?: Promise<Record<string, string | undefined>>;
  searchParams?: Promise<Record<string, string | undefined>>;
}

const Income = async ({ params, searchParams }: Props) => {
  const resolvedSearchParams = await searchParams;
  const filters = resolvedSearchParams?.filters;
  const month = filters ? JSON.parse(atob(filters))?.month : undefined;

  return (
    <section className="relative">
      <Filters />
      <Suspense key={filters} fallback={<ExpenseCardLoader />}>
        <IncomeList month={month} />
      </Suspense>
      <Link href="/income/new">
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
          Crear
        </Button>
      </Link>
    </section>
  );
};

export default Income;
