import { BookmarkX } from 'lucide-react';

import { fetchCreditList } from '@/app/credit/services/fetchCreditList';

interface IncomeListProps {
  month?: string;
}

export const IncomeList = async (props: IncomeListProps) => {
  const data = await fetchCreditList(props);

  return (
    <div className="p-4 flex flex-col gap-2 mb-40">
      {/*<IncomeSummary {...summary} />*/}
      {data.length === 0 && (
        <div className="flex flex-col gap-2 items-center justify-center text-tertiary">
          <BookmarkX />
          <p className="font-light">No existen registros</p>
        </div>
      )}
      {/*{data?.map((expense) => <IncomeCard key={expense.id} {...expense} />)}*/}
    </div>
  );
};
