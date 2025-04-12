import Link from 'next/link';
import { useMemo } from 'react';

import { GeneralBill } from '@/app/expense/types';
import { ICURRENCY } from '@/lib/definitions';
import { CRCFormatter, USDFormatter } from '@/lib/numberFormats';
import { cn } from '@/lib/utils';

export const BillCard = (props: GeneralBill) => {
  const {
    id,
    currency,
    monthlyAmount = 0,
    annualAmount,
    accumulatedAmount,
    name,
    expenses,
  } = props;
  const { totalYear, totalMonth } = expenses;

  const monthlyColor = useMemo(() => {
    const average = monthlyAmount > 0 ? (totalMonth / monthlyAmount) * 100 : 0;
    if (average < 70) {
      return 'text-success';
    }
    if (average < 100) {
      return 'text-warning font-semibold';
    }

    return 'text-error font-bold';
  }, [monthlyAmount, totalMonth]);

  const annuallyColor = useMemo(() => {
    const average = annualAmount > 0 ? (totalYear / annualAmount) * 100 : 0;
    if (average < 70) {
      return 'text-success';
    }
    if (average < 100) {
      return 'text-warning font-semibold';
    }

    return 'text-error font-bold';
  }, [annualAmount, totalYear]);

  const accumulatedColor = useMemo(() => {
    if (accumulatedAmount < 0) {
      return 'text-error font-bold';
    }
    return 'text-tertiary';
  }, [accumulatedAmount]);

  return (
    <Link href={{ pathname: `/bill/${id}` }}>
      <div className="bg-white rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow border border-uranian/20">
        <h3 className="font-semibold text-tertiary text-sm">{name}</h3>

        <div className="my-3 grid grid-cols-[60px_1fr] justify-start items-end gap-2 w-full">
          <p className="text-tertiary text-xs font-bold text-end">Mensual:</p>
          <div className="flex justify-between items-center grow border-b border-dashed">
            <div className="flex flex-col gap-1">
              <p className="text-tertiary text-[10px]">Gasto:</p>
              <p className={cn('text-xs', monthlyColor)}>
                {currency === ICURRENCY.CRC
                  ? CRCFormatter(totalMonth)
                  : USDFormatter(totalMonth)}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-tertiary text-[10px]">Presupuesto:</p>
              <p className="text-tertiary text-xs">
                {currency === ICURRENCY.CRC
                  ? CRCFormatter(monthlyAmount)
                  : USDFormatter(monthlyAmount)}
              </p>
            </div>
          </div>
        </div>

        <div className="my-3 grid grid-cols-[60px_1fr] justify-start items-end gap-2 w-full">
          <p className="text-tertiary text-xs font-bold text-end">Anual:</p>
          <div className="flex justify-between items-center grow border-b border-dashed">
            <div className="flex flex-col gap-1">
              <p className="text-tertiary text-[10px]">Gasto:</p>
              <p className={cn('text-xs', annuallyColor)}>
                {currency === ICURRENCY.CRC
                  ? CRCFormatter(totalYear)
                  : USDFormatter(totalYear)}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-tertiary text-[10px]">Presupuesto:</p>
              <p className="text-tertiary text-xs">
                {currency === ICURRENCY.CRC
                  ? CRCFormatter(annualAmount)
                  : USDFormatter(annualAmount)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-1 justify-end">
          <p className="text-tertiary text-xs font-bold">Acumulado:</p>
          <p className={cn('text-xs', accumulatedColor)}>
            {currency === ICURRENCY.CRC
              ? CRCFormatter(accumulatedAmount)
              : USDFormatter(accumulatedAmount)}
          </p>
        </div>
      </div>
    </Link>
  );
};
