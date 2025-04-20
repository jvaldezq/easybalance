import { TagIcon } from 'lucide-react';
import React from 'react';

import {
  ICURRENCY,
  IIncome,
  IINCOME_CATEGORY,
  IINCOME_CATEGORY_TRANSLATION,
} from '@/lib/definitions';
import { CRCFormatter, USDFormatter } from '@/lib/numberFormats';
import { cn } from '@/lib/utils';

export const IncomeCard = (props: IIncome) => {
  const { description, rentTax, ivaTax, amount = 0, currency } = props;

  return (
    <div className="bg-white rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow border border-uranian/20">
      <h3 className="font-semibold text-tertiary text-sm">{description}</h3>

      <div className="my-3 grid grid-cols-[60px_1fr] justify-start items-end gap-2 w-full">
        <p className="text-tertiary text-xs font-bold text-end">Monto:</p>
        <div className="flex justify-end items-center grow border-b border-dashed">
          <div className="flex flex-col gap-1">
            <p className="text-success font-bold text-xs">
              {currency === ICURRENCY.CRC
                ? CRCFormatter(amount)
                : USDFormatter(amount)}
            </p>
          </div>
        </div>
      </div>

      {(ivaTax ?? 0) > 0 && (
        <div className="my-3 grid grid-cols-[60px_1fr] justify-start items-end gap-2 w-full">
          <p className="text-tertiary text-xs font-bold text-end">IVA:</p>
          <div className="flex justify-end items-center grow border-b border-dashed">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-error">
                {currency === ICURRENCY.CRC
                  ? CRCFormatter(ivaTax || 0)
                  : USDFormatter(ivaTax || 0)}
              </p>
            </div>
          </div>
        </div>
      )}

      {(rentTax ?? 0) > 0 && (
        <div className="my-3 grid grid-cols-[60px_1fr] justify-start items-end gap-2 w-full">
          <p className="text-tertiary text-xs font-bold text-end">Renta:</p>
          <div className="flex justify-end items-center grow border-b border-dashed">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-error">
                {currency === ICURRENCY.CRC
                  ? CRCFormatter(rentTax || 0)
                  : USDFormatter(rentTax || 0)}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-1 justify-end">
        <p className="text-tertiary text-xs font-bold">Bruto:</p>
        <p className={cn('text-xs')}>
          {currency === ICURRENCY.CRC
            ? CRCFormatter(amount + (ivaTax || 0) + (rentTax || 0))
            : USDFormatter(amount + (ivaTax || 0) + (rentTax || 0))}
        </p>
      </div>
    </div>
  );
};
