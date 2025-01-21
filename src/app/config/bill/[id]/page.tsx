import 'dayjs/locale/es';
import dayjs from 'dayjs';
import { Suspense } from 'react';

import { ExpenseCardLoader } from '@/components/ExpenseCardLoader';
import { ExpenseList } from '@/components/ExpenseList';

// eslint-disable-next-line import/no-named-as-default-member
dayjs.locale('es');

interface Props {
  params?: Promise<Record<string, string | undefined>>;
  searchParams?: Promise<Record<string, string | undefined>>;
}

const BillById = async ({ params, searchParams }: Props) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const filters = resolvedSearchParams?.filters;
  const billId = resolvedParams?.id;
  const month = filters ? JSON.parse(atob(filters))?.month : undefined;

  return (
    <section className="max-w-screen-lg mx-auto py-2 pt-12 flex flex-col gap-4 mb-8">
      <Suspense key={filters} fallback={<ExpenseCardLoader />}>
        <ExpenseList billId={billId} month={month} />
      </Suspense>
    </section>
  );
};

export default BillById;
