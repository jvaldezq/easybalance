import * as React from 'react';

import { ICURRENCY, IExpenseAmount } from '@/lib/definitions';
import { CRCFormatter, USDFormatter } from '@/lib/numberFormats';

export const ExpenseSummary = (props: IExpenseAmount) => {
  const { bill, monthExpenseAmount = 0 } = props;
  if (!bill?.id) {
    return null;
  }
  const amount = bill?.amount || 0;
  const accumulatedAmount = bill?.accumulatedAmount || 0;
  const availableAmount = amount - monthExpenseAmount;

  return (
    <div className="rounded-2xl p-4 bg-gray-50 grid grid-cols-2 gap-2 animate-fade">
      <h1 className="text-base col-span-full mb-2">{bill?.name}</h1>
      <div className="flex flex-col gap-2 text-sm">
        <p className="text-primary font-light">Presupuesto Mensual</p>
        <p className="font-bold">
          {bill?.currency === ICURRENCY.CRC
            ? CRCFormatter(amount)
            : USDFormatter(amount)}
        </p>
      </div>

      <div className="flex flex-col gap-2 text-sm">
        <p className="text-primary font-light">Disponible Mensual</p>
        <p className="font-bold text-success">
          {bill?.currency === ICURRENCY.CRC
            ? CRCFormatter(availableAmount)
            : USDFormatter(availableAmount)}
        </p>
      </div>

      <div className="flex flex-col gap-2 text-sm">
        <p className="text-primary font-light">Acumulado</p>
        <p className="font-bold">
          {bill?.currency === ICURRENCY.CRC
            ? CRCFormatter(accumulatedAmount)
            : USDFormatter(accumulatedAmount)}
        </p>
      </div>

      <div className="flex flex-col gap-2 text-sm">
        <p className="text-primary font-light">Disponible Acumulado</p>
        <p className="font-bold text-success">
          {bill?.currency === ICURRENCY.CRC
            ? CRCFormatter(availableAmount + accumulatedAmount)
            : USDFormatter(availableAmount + accumulatedAmount)}
        </p>
      </div>
    </div>
  );
};
