import dayjs from 'dayjs';
import {
  BanknoteIcon as BanknotesIcon,
  CalendarIcon,
  TagIcon,
} from 'lucide-react';
import React from 'react';

import {
  ICURRENCY,
  IIncome,
  IINCOME_CATEGORY,
  IINCOME_CATEGORY_TRANSLATION,
} from '@/lib/definitions';
import { CRCFormatter, USDFormatter } from '@/lib/numberFormats';

export const IncomeCard = (props: IIncome) => {
  const {
    description,
    category,
    rentTax,
    ivaTax,
    createdAt,
    amount = 0,
    currency,
  } = props;

  const calculateNetAmount = () => {
    if (!amount) return 0;
    const ivaDeduction = ivaTax ? (amount * ivaTax) / 100 : 0;
    const rentDeduction = rentTax ? (amount * rentTax) / 100 : 0;
    return amount - ivaDeduction - rentDeduction;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer border border-uranian/20">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="font-semibold text-tertiary text-sm">
            {description || 'Sin descripción'}
          </h3>
          <div className="flex items-center gap-2 text-sm text-secondary mt-1">
            <TagIcon size={14} />
            <span>
              {IINCOME_CATEGORY_TRANSLATION[category as IINCOME_CATEGORY]}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-success">
            {currency === ICURRENCY.CRC
              ? CRCFormatter(amount)
              : USDFormatter(amount)}
          </div>
          {(ivaTax || rentTax) && (
            <div className="text-xs text-secondary">
              Neto:{' '}
              {currency === ICURRENCY.CRC
                ? CRCFormatter(calculateNetAmount())
                : USDFormatter(calculateNetAmount())}
            </div>
          )}
        </div>
      </div>

      {(ivaTax || rentTax) && (
        <div className="mt-3 space-y-1">
          {ivaTax && (
            <div className="flex items-center justify-between text-sm text-tertiary">
              <span>IVA ({ivaTax}%)</span>
              <span className="text-error">
                -
                {currency === ICURRENCY.CRC
                  ? CRCFormatter((amount * ivaTax) / 100)
                  : USDFormatter((amount * ivaTax) / 100)}
              </span>
            </div>
          )}
          {rentTax && (
            <div className="flex items-center justify-between text-sm text-tertiary">
              <span>Renta ({rentTax}%)</span>
              <span className="text-error">
                -
                {currency === ICURRENCY.CRC
                  ? CRCFormatter((amount * rentTax) / 100)
                  : USDFormatter((amount * rentTax) / 100)}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-secondary">
          <BanknotesIcon size={16} />
          <span>{currency}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-secondary">
          <CalendarIcon size={16} />
          <span>{dayjs(createdAt).format('DD MMM YYYY')}</span>
        </div>
      </div>
    </div>
  );
};
