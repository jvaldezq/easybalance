import React from 'react';

import { ICredit, ICURRENCY } from '@/lib/definitions';
import {
  CRCFormatter,
  PercentageFormatter,
  USDFormatter,
} from '@/lib/numberFormats';

export const CreditCard = (props: ICredit) => {
  const { bank, currency, balance, monthlyPayment, insurance, interestAnual } =
    props;

  return (
    <div className="bg-white rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow border border-uranian/20">
      <h3 className="font-semibold text-tertiary text-sm">{bank}</h3>

      <div className="my-3 grid grid-cols-[60px_1fr] justify-start items-end gap-2 w-full">
        <p className="text-tertiary text-xs font-bold text-end">Balance:</p>
        <div className="flex justify-end items-center grow border-b border-dashed">
          <div className="flex flex-col gap-1">
            <p className="text-error font-bold text-xs">
              {currency === ICURRENCY.CRC
                ? CRCFormatter(balance)
                : USDFormatter(balance)}
            </p>
          </div>
        </div>
      </div>

      <div className="my-3 grid grid-cols-[60px_1fr] justify-start items-end gap-2 w-full">
        <p className="text-tertiary text-xs font-bold text-end">Monto:</p>
        <div className="flex justify-end items-center grow border-b border-dashed">
          <div className="flex flex-col gap-1">
            <p className="text-success font-bold text-xs">
              {currency === ICURRENCY.CRC
                ? CRCFormatter(monthlyPayment)
                : USDFormatter(monthlyPayment)}
            </p>
          </div>
        </div>
      </div>

      <div className="my-3 grid grid-cols-[60px_1fr] justify-start items-end gap-2 w-full">
        <p className="text-tertiary text-xs font-bold text-end">Seguros:</p>
        <div className="flex justify-end items-center grow border-b border-dashed">
          <div className="flex flex-col gap-1">
            <p className="text-tertiary font-bold text-xs">
              {currency === ICURRENCY.CRC
                ? CRCFormatter(insurance)
                : USDFormatter(insurance)}
            </p>
          </div>
        </div>
      </div>

      <div className="my-3 grid grid-cols-[60px_1fr] justify-start items-end gap-2 w-full">
        <p className="text-tertiary text-xs font-bold text-end">Interés:</p>
        <div className="flex justify-end items-center grow border-b border-dashed">
          <div className="flex flex-col gap-1">
            <p className="text-tertiary font-bold text-xs">
              {PercentageFormatter(interestAnual)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
