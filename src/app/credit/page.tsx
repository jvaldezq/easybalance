import { Suspense } from 'react';

import { CreditList } from '@/app/credit/CreditList';
import { CreditSummary } from '@/app/credit/CreditSummary';
import { ExpenseCardLoader } from '@/components/ExpenseCardLoader';

const Credit = async () => {
  return (
    <section className="relative">
      <CreditSummary />
      <Suspense fallback={<ExpenseCardLoader />}>
        <CreditList />
      </Suspense>
    </section>
  );
};

export default Credit;
