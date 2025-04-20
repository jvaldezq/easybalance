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
  } = props;

  return (
    <div className="grid md:grid-cols-3 gap-2">
      <div className="bg-warning/[0.2] rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow border border-uranian/20">
        <h3 className="font-semibold text-tertiary text-sm mb-4">Ingresos</h3>
        <div className="grid sm:grid-cols-2 gap-2 items-center justify-start">
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-tertiary text-[10px]">Dolares:</p>
            <p className="text-tertiary font-semibold">
              {USDFormatter(totalDollars)}
            </p>
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-tertiary text-[10px]">Colones:</p>
            <p className="text-tertiary font-semibold">
              {CRCFormatter(totalColones)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-warning/[0.2] rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow border border-uranian/20">
        <h3 className="font-semibold text-tertiary text-sm mb-4">
          Impuesto IVA
        </h3>
        <div className="grid sm:grid-cols-2 gap-2 items-center justify-start">
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-tertiary text-[10px]">Dolares:</p>
            <p className="text-tertiary font-semibold">
              {USDFormatter(ivaTaxDollars)}
            </p>
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-tertiary text-[10px]">Colones:</p>
            <p className="text-tertiary font-semibold">
              {CRCFormatter(ivaTaxColones)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-warning/[0.2] rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow border border-uranian/20">
        <h3 className="font-semibold text-tertiary text-sm mb-4">
          Impuesto Renta
        </h3>
        <div className="grid sm:grid-cols-2 gap-2 items-center justify-start">
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-tertiary text-[10px]">Dolares:</p>
            <p className="text-tertiary font-semibold">
              {USDFormatter(rentTaxDollars)}
            </p>
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-tertiary text-[10px]">Colones:</p>
            <p className="text-tertiary font-semibold">
              {CRCFormatter(rentTaxColones)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
