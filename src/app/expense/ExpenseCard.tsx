import { CircleHelp, CreditCard } from 'lucide-react';

import { PAYMENT_METHODS } from '@/lib/constants';
import { ICURRENCY, IExpense } from '@/lib/definitions';
import { CRCFormatter, USDFormatter } from '@/lib/numberFormats';
import { cn } from '@/lib/utils';

type ExpenseCardProps = IExpense;

export const ExpenseCard = (props: ExpenseCardProps) => {
  const { description, amount = 0, paymentMethod, bill, currency } = props;
  return (
    <div
      className={cn(
        'bg-white',
        'rounded-xl',
        'p-3',
        'shadow-sm',
        'border',
        'border-uranian/20',
        'transition-shadow',
        'animate-fade-up',
      )}
    >
      <div className="flex gap-3">
        <div className="p-2 rounded-lg bg-uranian/10 h-fit">
          <CircleHelp className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-medium text-tertiary truncate">{bill?.name}</h3>
            <p className="font-semibold text-tertiary shrink-0">
              {currency === ICURRENCY.CRC
                ? CRCFormatter(amount)
                : USDFormatter(amount)}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            {description && (
              <p className="text-xs text-primary/60 italic">{description}</p>
            )}
            <div className="flex items-center gap-1.5 text-xs text-secondary">
              <CreditCard className="w-3.5 h-3.5" />
              <span>
                {
                  PAYMENT_METHODS.find((method) => method.id === paymentMethod)
                    ?.name
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
