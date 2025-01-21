import { BookmarkX } from 'lucide-react';

import { ExpenseCard } from '@/components/ExpenseCard';
import { fetchExpenseList } from '@/services/expense/fetchExpenseList';

interface ExpenseListProps {
  billId?: string;
  month?: string;
}

export const ExpenseList = async (props: ExpenseListProps) => {
  const data = await fetchExpenseList(props);
  return (
    <div className="p-4 flex flex-col gap-2 mb-40">
      {data.length === 0 && (
        <div className="flex flex-col gap-2 items-center justify-center text-tertiary">
          <BookmarkX />
          <p className="font-light">No existen registros</p>
        </div>
      )}
      {data?.map((expense) => <ExpenseCard key={expense.id} {...expense} />)}
    </div>
  );
};
