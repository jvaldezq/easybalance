import dayjs from 'dayjs';
import { CalendarIcon, TrendingUp, TrendingDown } from 'lucide-react';
import React from 'react';

import { CRCFormatter, USDFormatter } from '@/lib/numberFormats';

export interface IIncomeSummary {
  totalDollars: number;
  totalColones: number;
  ivaTaxColones: number;
  rentTaxColones: number;
  ivaTaxDollars: number;
  rentTaxDollars: number;
  month?: string;
}

export const IncomeSummary = async (props: IIncomeSummary) => {
  const {
    totalColones,
    rentTaxColones,
    ivaTaxColones,
    totalDollars,
    rentTaxDollars,
    ivaTaxDollars,
    month,
  } = props;
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer border border-uranian/20">
      <div className="flex flex-col gap-2 items-start mb-2">
        <div className="flex flex-col w-full gap-1">
          <div className="flex items-center gap-1">
            <p className="text-sm text-primary font-bold">Ingresos</p>
            <TrendingUp className="text-success w-4 h-4" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-secondary">Dolares</p>
              <p className="ml-1 font-bold text-success">
                {USDFormatter(totalDollars)}
              </p>
            </div>
            <div>
              <p className="text-sm text-secondary">Colones</p>
              <p className="ml-1 font-bold text-success">
                {CRCFormatter(totalColones)}
              </p>
            </div>
          </div>
        </div>

        {(ivaTaxDollars > 0 || ivaTaxColones > 0) && (
          <div className="flex flex-col w-full gap-1 border-t border-gray-100 pt-3">
            <div className="flex items-center gap-1">
              <p className="text-sm text-primary font-bold">Impuesto IVA</p>
              <TrendingDown className="text-error w-4 h-4" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-secondary">Dolares</p>
                <p className="ml-1 font-medium text-error">
                  {USDFormatter(ivaTaxDollars)}
                </p>
              </div>
              <div>
                <p className="text-sm text-secondary">Colones</p>
                <p className="ml-1 font-medium text-error">
                  {CRCFormatter(ivaTaxColones)}
                </p>
              </div>
            </div>
          </div>
        )}

        {(rentTaxDollars > 0 || rentTaxColones > 0) && (
          <div className="flex flex-col w-full gap-1 border-t border-gray-100 pt-3">
            <div className="flex items-center gap-1">
              <p className="text-sm text-primary font-bold">Impuesto Renta</p>
              <TrendingDown className="text-error w-4 h-4" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-secondary">Dolares</p>
                <p className="ml-1 font-medium text-error">
                  {USDFormatter(rentTaxDollars)}
                </p>
              </div>
              <div>
                <p className="text-sm text-secondary">Colones</p>
                <p className="ml-1 font-medium text-error">
                  {CRCFormatter(rentTaxColones)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-secondary">
          <CalendarIcon size={16} />
          <span>{dayjs(month).format('MMMM')}</span>
        </div>
      </div>
    </div>
  );
};
