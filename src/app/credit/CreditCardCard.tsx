import React from 'react';

import { ICreditCards } from '@/lib/definitions';
import {
  CRCFormatter,
  PercentageFormatter,
  USDFormatter,
} from '@/lib/numberFormats';

export const CreditCardCard = (props: ICreditCards) => {
  const {
    bank,
    cashPaymentUSD,
    cashPaymentCRC,
    interestAnual,
    minimumPaymentCRC,
    minimumPaymentUSD,
  } = props;

  return (
    <div className="bg-white rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow border border-uranian/20">
      <h3 className="font-semibold text-tertiary text-sm">{bank}</h3>

      <div className="my-3 grid grid-cols-[100px_1fr] justify-start items-end gap-2 w-full">
        <p className="text-tertiary text-xs font-bold text-end">Balance USD:</p>
        <div className="flex justify-end items-center grow border-b border-dashed">
          <div className="flex flex-col gap-1">
            <p className="text-error font-bold text-xs">
              {USDFormatter(cashPaymentUSD)}
            </p>
          </div>
        </div>
      </div>

      <div className="my-3 grid grid-cols-[100px_1fr] justify-start items-end gap-2 w-full">
        <p className="text-tertiary text-xs font-bold text-end">Monto USD:</p>
        <div className="flex justify-end items-center grow border-b border-dashed">
          <div className="flex flex-col gap-1">
            <p className="text-success font-bold text-xs">
              {USDFormatter(minimumPaymentUSD)}
            </p>
          </div>
        </div>
      </div>

      <div className="my-3 grid grid-cols-[100px_1fr] justify-start items-end gap-2 w-full">
        <p className="text-tertiary text-xs font-bold text-end">Balance CRC:</p>
        <div className="flex justify-end items-center grow border-b border-dashed">
          <div className="flex flex-col gap-1">
            <p className="text-error font-bold text-xs">
              {CRCFormatter(cashPaymentCRC)}
            </p>
          </div>
        </div>
      </div>

      <div className="my-3 grid grid-cols-[100px_1fr] justify-start items-end gap-2 w-full">
        <p className="text-tertiary text-xs font-bold text-end">Monto CRC:</p>
        <div className="flex justify-end items-center grow border-b border-dashed">
          <div className="flex flex-col gap-1">
            <p className="text-success font-bold text-xs">
              {CRCFormatter(minimumPaymentCRC)}
            </p>
          </div>
        </div>
      </div>

      <div className="my-3 grid grid-cols-[100px_1fr] justify-start items-end gap-2 w-full">
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
