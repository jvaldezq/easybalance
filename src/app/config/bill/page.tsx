import dayjs from 'dayjs';
import { Suspense } from 'react';

import 'dayjs/locale/es';
import { BillCardLoader } from '@/app/config/bill/components/BillCardLoader';

import { BillList } from './components/BillList';
import { Filters } from './components/Filters';

// eslint-disable-next-line import/no-named-as-default-member
dayjs.locale('es');

interface Props {
  searchParams?: Promise<Record<string, string | undefined>>;
}

const ConfigExpense = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams;
  const filters = resolvedSearchParams?.filters;

  return (
    <section className="max-w-screen-lg mx-auto pt-12 flex flex-col gap-4 mb-8">
      <Filters filters={filters} />
      <Suspense key={filters} fallback={<BillCardLoader />}>
        <BillList filters={filters} />
      </Suspense>
    </section>
  );
};

export default ConfigExpense;
