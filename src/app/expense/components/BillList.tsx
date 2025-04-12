import { fetchBills } from '@/app/expense/services/fetchBills';
import { CRCFormatter, USDFormatter } from '@/lib/numberFormats';

import { BillCard } from './BillCard';

export const BillList = async () => {
  const data = await fetchBills();
  return (
    <section className="p-4 flex flex-col gap-2 mb-40">
      <div className="grid md:grid-cols-3 gap-2">
        <div className="bg-warning/[0.2] rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow border border-uranian/20">
          <h3 className="font-semibold text-tertiary text-sm mb-4">Hoy</h3>
          <div className="grid sm:grid-cols-2 gap-2 items-center justify-start">
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-tertiary text-[10px]">Dolares:</p>
              <p className="text-tertiary font-semibold">
                {USDFormatter(data?.generalData?.USD?.totalToday || 0)}
              </p>
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-tertiary text-[10px]">Colones:</p>
              <p className="text-tertiary font-semibold">
                {CRCFormatter(data?.generalData?.CRC?.totalToday || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-warning/[0.2] rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow border border-uranian/20">
          <h3 className="font-semibold text-tertiary text-sm mb-4">Mes</h3>
          <div className="grid sm:grid-cols-2 gap-2 items-center justify-start">
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-tertiary text-[10px]">Dolares:</p>
              <p className="text-tertiary font-semibold">
                {USDFormatter(data?.generalData?.USD?.totalMonth || 0)}
              </p>
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-tertiary text-[10px]">Colones:</p>
              <p className="text-tertiary font-semibold">
                {CRCFormatter(data?.generalData?.CRC?.totalMonth || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-warning/[0.2] rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow border border-uranian/20">
          <h3 className="font-semibold text-tertiary text-sm mb-4">Año</h3>
          <div className="grid sm:grid-cols-2 gap-2 items-center justify-start">
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-tertiary text-[10px]">Dolares:</p>
              <p className="text-tertiary font-semibold">
                {USDFormatter(data?.generalData?.USD?.totalYear || 0)}
              </p>
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-tertiary text-[10px]">Colones:</p>
              <p className="text-tertiary font-semibold">
                {CRCFormatter(data?.generalData?.CRC?.totalYear || 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {data?.bills?.map((expense) => (
          <BillCard key={expense.id} {...expense} />
        ))}
      </div>
    </section>
  );
};
