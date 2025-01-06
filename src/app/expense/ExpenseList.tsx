import { ExpenseCard } from '@/app/expense/ExpenseCard';
import { fetchExpenseList } from '@/services/expense/fetchExpenseList';

export const ExpenseList = async () => {
  const data = await fetchExpenseList();
  return (
    <div className="p-4 flex flex-col gap-2 mb-40">
      {data?.map((expense) => <ExpenseCard key={expense.id} {...expense} />)}
    </div>
  );
};
