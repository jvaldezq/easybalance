import React from 'react';

import { fetchCreditSummary } from '@/app/credit/services/fetchCreditSummary';
import { CRCFormatter, USDFormatter } from '@/lib/numberFormats';

export const CreditSummary = async () => {
  const data = await fetchCreditSummary();
  return (
    <div className="grid md:grid-cols-3 gap-2 p-4">
      <div className="bg-warning/[0.2] rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow border border-uranian/20">
        <h3 className="font-semibold text-tertiary text-sm mb-4">Préstamos</h3>
        <div className="grid sm:grid-cols-2 gap-2 items-center justify-start">
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-tertiary text-[10px]">Balance:</p>
            <p className="text-tertiary font-semibold">
              {USDFormatter(data?.credits?.balance || 0)}
            </p>
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-tertiary text-[10px]">Mensualidad:</p>
            <p className="text-tertiary font-semibold">
              {USDFormatter(data?.credits?.monthlyPayment || 0)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-warning/[0.2] rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow border border-uranian/20">
        <h3 className="font-semibold text-tertiary text-sm mb-4">
          Tarjetas de crédito
        </h3>
        <div className="grid sm:grid-cols-2 gap-2 items-center justify-start">
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-tertiary text-[10px]">Balance CRC:</p>
            <p className="text-tertiary font-semibold">
              {CRCFormatter(data?.creditsCards?.cashPaymentCRC || 0)}
            </p>
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-tertiary text-[10px]">Balance USD:</p>
            <p className="text-tertiary font-semibold">
              {USDFormatter(data?.creditsCards?.cashPaymentUSD || 0)}
            </p>
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-tertiary text-[10px]">Mínimo CRC:</p>
            <p className="text-tertiary font-semibold">
              {CRCFormatter(data?.creditsCards?.minimumPaymentCRC || 0)}
            </p>
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-tertiary text-[10px]">Mínimo USD:</p>
            <p className="text-tertiary font-semibold">
              {USDFormatter(data?.creditsCards?.minimumPaymentUSD || 0)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-warning/[0.2] rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow border border-uranian/20">
        <h3 className="font-semibold text-tertiary text-sm mb-4">
          Intra/Extra Financiamiento
        </h3>
        <div className="grid sm:grid-cols-2 gap-2 items-center justify-start">
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-tertiary text-[10px]">Balance:</p>
            <p className="text-tertiary font-semibold">
              {CRCFormatter(data?.creditCardFinances?.balance || 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
