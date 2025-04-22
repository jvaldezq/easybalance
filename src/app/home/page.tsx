import React from 'react';

import { fetchHomeInfo } from '@/app/home/services/fetchHomeInfo';
import { CRCFormatter, USDFormatter } from '@/lib/numberFormats';

const Home = async () => {
  const data = await fetchHomeInfo();

  const billsAmountUSD = data?.billsAmount?.USD || 0;
  const billsAmountCRC = data?.billsAmount?.CRC || 0;
  const creditsUSDPayments = data?.credits?.dollar?.payments || 0;
  const creditsCRCPayments = data?.credits?.collons?.payments || 0;
  const billsAccumulatedUSD = data?.billsAccumulated?.USD || 0;
  const billsAccumulatedCRC = data?.billsAccumulated?.CRC || 0;
  const ivaTaxAmountUSD = data?.ivaTaxAmount?.USD || 0;
  const ivaTaxAmountCRC = data?.ivaTaxAmount?.CRC || 0;
  const incomeAmountUSD = data?.incomeAmount?.USD || 0;
  const incomeAmountCRC = data?.incomeAmount?.CRC || 0;
  const creditsBalanceUSD = data?.credits?.dollar?.balance || 0;
  const creditsBalanceCRC = data?.credits?.collons?.balance || 0;

  const montlyUSD = billsAmountUSD + creditsUSDPayments;

  const montlyCRC = billsAmountCRC + creditsCRCPayments;

  const acumulatedUSD =
    billsAccumulatedUSD + ivaTaxAmountUSD + (data?.rentTaxAmount?.USD || 0);
  const acumulatedCRC =
    billsAccumulatedCRC + ivaTaxAmountCRC + (data?.rentTaxAmount?.CRC || 0);

  const totalDept = creditsBalanceUSD + creditsBalanceCRC / 500;

  const totalPayments = montlyUSD + montlyCRC / 500;

  const totalAcumulated = acumulatedUSD + acumulatedCRC / 500;

  const totalIncome = incomeAmountUSD + incomeAmountCRC / 500;

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 p-4">
      <div className="bg-primary rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow border border-uranian/20">
        <h3 className="font-semibold text-white text-sm mb-4">
          General Total Dolares
        </h3>
        <div className="grid sm:grid-cols-2 gap-2 items-center justify-start">
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-white text-[10px]">Deudas:</p>
            <p className="text-white font-semibold">
              {USDFormatter(totalDept)}
            </p>
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-white text-[10px]">Pagos mensuales:</p>
            <p className="text-white font-semibold">
              {USDFormatter(totalPayments)}
            </p>
          </div>

          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-white text-[10px]">Acumulado:</p>
            <p className="text-white font-semibold">
              {USDFormatter(totalAcumulated)}
            </p>
          </div>

          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-white text-[10px]">Ingresos:</p>
            <p className="text-white font-semibold">
              {USDFormatter(totalIncome)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-warning/[0.2] rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow border border-uranian/20">
        <h3 className="font-semibold text-tertiary text-sm mb-4">Deudas</h3>
        <div className="grid sm:grid-cols-2 gap-2 items-center justify-start">
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-tertiary text-[10px]">Dolares:</p>
            <p className="text-tertiary font-semibold">
              {USDFormatter(creditsBalanceUSD)}
            </p>
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-tertiary text-[10px]">Colones:</p>
            <p className="text-tertiary font-semibold">
              {CRCFormatter(creditsBalanceCRC)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-warning/[0.2] rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow border border-uranian/20">
        <h3 className="font-semibold text-tertiary text-sm mb-4">
          Pagos mensuales
        </h3>
        <div className="grid sm:grid-cols-2 gap-2 items-center justify-start">
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-tertiary text-[10px]">Dolares:</p>
            <p className="text-tertiary font-semibold">
              {USDFormatter(montlyUSD)}
            </p>
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-tertiary text-[10px]">Colones:</p>
            <p className="text-tertiary font-semibold">
              {CRCFormatter(montlyCRC)}
            </p>
            <p className="text-tertiary text-xs font-semibold">
              {USDFormatter(montlyCRC / 500)} (500 CRC)
            </p>
          </div>
        </div>
      </div>

      <div className="bg-warning/[0.2] rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow border border-uranian/20">
        <h3 className="font-semibold text-tertiary text-sm mb-4">
          Ingresos Mensuales
        </h3>
        <div className="grid sm:grid-cols-2 gap-2 items-center justify-start">
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-tertiary text-[10px]">Dolares:</p>
            <p className="text-tertiary font-semibold">
              {USDFormatter(incomeAmountUSD)}
            </p>
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-tertiary text-[10px]">Colones:</p>
            <p className="text-tertiary font-semibold">
              {CRCFormatter(incomeAmountCRC)}
            </p>
            <p className="text-tertiary text-xs font-semibold">
              {USDFormatter(incomeAmountCRC / 500)} (500 CRC)
            </p>
          </div>
        </div>
      </div>

      <div className="bg-warning/[0.2] rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow border border-uranian/20">
        <h3 className="font-semibold text-tertiary text-sm mb-4">
          Acumulado en cuenta
        </h3>
        <div className="grid sm:grid-cols-2 gap-2 items-center justify-start">
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-tertiary text-[10px]">Dolares:</p>
            <p className="text-tertiary font-semibold">
              {USDFormatter(acumulatedUSD)}
            </p>
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-tertiary text-[10px]">Colones:</p>
            <p className="text-tertiary font-semibold">
              {CRCFormatter(acumulatedCRC)}
            </p>
            <p className="text-tertiary text-xs font-semibold">
              {USDFormatter(acumulatedCRC / 500)} (500 CRC)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
