import { BookmarkX } from 'lucide-react';

import { ExpenseCard } from '@/components/ExpenseCard';
import { IExpense } from '@/lib/definitions';
import { fetchYearlyExpensesByBillId } from '@/services/expense/fetchExpenseList';

interface ExpenseListProps {
  billId: string;
}

const months: string[] = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

export type ExpenseItem = {
  id: string;
  description: string | null;
  currency: string;
  paymentMethod: string;
  amount: number;
  billId: string;
  createdAt: Date;
  updatedAt: Date;
};

export const ExpenseList = async (props: ExpenseListProps) => {
  const data = await fetchYearlyExpensesByBillId(props);

  const hasExpenses = Object.values(data).some(
    (monthList) => monthList.length > 0,
  );

  if (!hasExpenses) {
    return (
      <div className="p-4 flex flex-col gap-2 items-center justify-center text-tertiary">
        <BookmarkX />
        <p className="font-light">No existen registros</p>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-6 mb-40">
      {months.map((monthName) => {
        const expenses = data[monthName];
        if (!expenses || expenses.length === 0) return null;

        return (
          <div key={monthName}>
            <h3 className="text-lg font-semibold text-primary mb-2 capitalize">
              {monthName}
            </h3>
            <div className="flex flex-col gap-2">
              {expenses.map((expense) => (
                <ExpenseCard
                  key={expense.id}
                  {...expense}
                  description={expense.description ?? ''}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
