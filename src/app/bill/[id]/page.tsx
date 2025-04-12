import 'dayjs/locale/es';
import dayjs from 'dayjs';
import { Suspense } from 'react';

import { ExpenseCardLoader } from '@/components/ExpenseCardLoader';
import { ExpenseList } from '@/components/ExpenseList';

// eslint-disable-next-line import/no-named-as-default-member
dayjs.locale('es');

interface Props {
  params?: Promise<Record<string, string | undefined>>;
}

const BillById = async ({ params }: Props) => {
  const resolvedParams = await params;
  const billId = resolvedParams?.id;

  return (
    <section className="py-2 pt-12 flex flex-col gap-4 mb-8">
      <Suspense fallback={<ExpenseCardLoader />}>
        <ExpenseList billId={billId || ''} />
      </Suspense>
    </section>
  );
};

export default BillById;
