import { ExpenseItem } from '@/components/ExpenseList';
import { ICURRENCY } from '@/lib/definitions';
import { CRCFormatter, USDFormatter } from '@/lib/numberFormats';
import { cn } from '@/lib/utils';

type ExpenseCardProps = ExpenseItem;

export const ExpenseCard = (props: ExpenseCardProps) => {
  const { description, amount = 0, currency } = props;
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
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-medium text-tertiary truncate">
              {description}
            </h3>
            <p className="font-semibold text-tertiary shrink-0">
              {currency === ICURRENCY.CRC
                ? CRCFormatter(amount)
                : USDFormatter(amount)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
