import { CreditCard } from '@/app/credit/CreditCard';
import { CreditCardCard } from '@/app/credit/CreditCardCard';
import { CreditCardFinancesCard } from '@/app/credit/CreditCardFinancesCard';
import { fetchCreditList } from '@/app/credit/services/fetchCreditList';

export const CreditList = async () => {
  const data = await fetchCreditList();

  return (
    <div className="p-4 flex flex-col gap-6 mb-40">
      <div>
        <h2 className="text-tertiary text-lg font-bold mb-6 border-b border-solid">
          Préstamos
        </h2>
        {data?.credits?.map((credit) => (
          <CreditCard key={credit.id} {...credit} />
        ))}
      </div>
      <div>
        <h2 className="text-tertiary text-lg font-bold mb-6 border-b border-solid">
          Tarjetas de crédito
        </h2>
        {data?.creditsCards?.map((credit) => (
          <CreditCardCard key={credit.id} {...credit} />
        ))}
      </div>

      <div>
        <h2 className="text-tertiary text-lg font-bold mb-6 border-b border-solid">
          Intra/Extra Financiamiento
        </h2>
        {data?.creditCardFinances?.map((credit) => (
          <CreditCardFinancesCard key={credit.id} {...credit} />
        ))}
      </div>
    </div>
  );
};
