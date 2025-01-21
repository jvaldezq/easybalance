import { fetchBillsByMonth } from '@/app/config/bill/services/fetchBillsByMonth';

import { BillCard } from './BillCard';

interface BillListProps {
  filters?: string;
}

export const BillList = async (props: BillListProps) => {
  const { filters } = props;
  const month = filters ? JSON.parse(atob(filters))?.month : undefined;
  const data = await fetchBillsByMonth(month);
  return (
    <div className="p-4 flex flex-col gap-2 mb-40">
      {data?.map((expense) => (
        <BillCard key={expense.id} {...expense} filters={filters} />
      ))}
    </div>
  );
};
