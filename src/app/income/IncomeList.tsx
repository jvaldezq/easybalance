import { BookmarkX } from 'lucide-react';

import { IncomeCard } from '@/app/income/IncomeCard';
import { fetchIncomeList } from '@/services/income/fetchIncomeList';

interface IncomeListProps {
  month?: string;
}

export const IncomeList = async (props: IncomeListProps) => {
  const data = await fetchIncomeList(props);
  return (
    <div className="p-4 flex flex-col gap-2 mb-40">
      {data.length === 0 && (
        <div className="flex flex-col gap-2 items-center justify-center text-tertiary">
          <BookmarkX />
          <p className="font-light">No existen registros</p>
        </div>
      )}
      {data?.map((expense) => <IncomeCard key={expense.id} {...expense} />)}
    </div>
  );
};
