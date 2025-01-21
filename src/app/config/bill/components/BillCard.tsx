import dayjs from 'dayjs';
import { ReceiptText, Tag, TrendingUp, Calendar } from 'lucide-react';
import Link from 'next/link';

import {
  IBill,
  IBILL_TYPE,
  IBILL_TYPE_TRANSLATION,
  ICURRENCY,
} from '@/lib/definitions';
import { CRCFormatter, USDFormatter } from '@/lib/numberFormats';

type ExpenseCardProps = IBill & {
  totalExpenses?: number;
  filters?: string;
};

export const BillCard = (props: ExpenseCardProps) => {
  const {
    id,
    currency,
    amount = 0,
    accumulatedAmount = 0,
    totalExpenses = 0,
    category,
    name,
    createdAt,
    type = IBILL_TYPE.OTHER,
    isPublic,
    filters,
  } = props;
  const progress = amount > 0 ? (totalExpenses / amount) * 100 : 0;
  return (
    <Link
      href={{
        pathname: `/config/bill/${id}`,
        query: { filters },
      }}
    >
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border border-uranian/20">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-uranian/20 rounded-full">
              <span className="text-xl" role="img" aria-label={category}>
                <ReceiptText />
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-tertiary text-sm">{name}</h3>
              <div className="flex items-center gap-2 text-xs text-secondary">
                <Tag className="w-3 h-3" />
                <span className="capitalize">
                  {IBILL_TYPE_TRANSLATION[type as IBILL_TYPE].toLowerCase()}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-tertiary">
              {currency === ICURRENCY.CRC
                ? CRCFormatter(amount)
                : USDFormatter(amount)}
            </p>
            {/*<div className="flex items-center gap-1 justify-end text-xs text-secondary">*/}
            {/*  <span>placeholder</span>*/}
            {/*</div>*/}
          </div>
        </div>

        <div className="space-y-3">
          {/* Progress bar */}
          <div className="space-y-1 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-tertiary">Progreso Mensual</span>
              <span className="font-medium text-tertiary">
                {progress.toFixed(0)}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  progress > 100
                    ? 'bg-red-500'
                    : progress > 75
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>

          {/* Current spent */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-tertiary">Gasto Actual</span>
            <span className="font-medium text-tertiary">
              {currency === ICURRENCY.CRC
                ? CRCFormatter(totalExpenses)
                : USDFormatter(totalExpenses)}
            </span>
          </div>

          {/* Accumulated amount */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-secondary" />
              <span className="text-tertiary">Monto Acumulado</span>
            </div>
            <span className="font-medium text-tertiary">
              {currency === ICURRENCY.CRC
                ? CRCFormatter(accumulatedAmount)
                : USDFormatter(accumulatedAmount)}
            </span>
          </div>

          {/* Due date and created date */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs">
            <div className="flex items-center gap-1 text-secondary">
              {/*<Info className="w-4 h-4" />*/}
              {isPublic ? 'Público' : 'Privado'}
            </div>
            {createdAt && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-secondary" />
                <span className="text-secondary capitalize">
                  Desde: {dayjs(createdAt).format('DD MMM YYYY')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
