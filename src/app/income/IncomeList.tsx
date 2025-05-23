import { BookmarkX } from 'lucide-react';

import { IncomeCard } from '@/app/income/IncomeCard';
import { IIncomeSummary, IncomeSummary } from '@/app/income/IncomeSummary';
import { ICURRENCY } from '@/lib/definitions';
import { fetchIncomeList } from '@/services/income/fetchIncomeList';

interface IncomeListProps {
  month?: string;
}

export const IncomeList = async (props: IncomeListProps) => {
  const data = await fetchIncomeList(props);

  const summary = data.reduce<IIncomeSummary>(
    (acc, income) => {
      const { amount = 0, currency, ivaTax, rentTax } = income;
      if (currency === ICURRENCY.USD) {
        acc.totalDollars += amount || 0;
        acc.ivaTaxDollars += ivaTax || 0;
        acc.rentTaxDollars += rentTax || 0;
      } else if (income.currency === ICURRENCY.CRC) {
        acc.totalColones += amount || 0;
        acc.ivaTaxColones += ivaTax || 0;
        acc.rentTaxColones += rentTax || 0;
      }
      return acc;
    },
    {
      totalDollars: 0,
      totalColones: 0,
      ivaTaxColones: 0,
      rentTaxColones: 0,
      ivaTaxDollars: 0,
      rentTaxDollars: 0,
    },
  );

  return (
    <div className="p-4 flex flex-col gap-2 mb-40">
      <IncomeSummary {...summary} />
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
