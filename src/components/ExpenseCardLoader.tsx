import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export const ExpenseCardLoader = () => {
  return (
    <div className="p-4 flex flex-col gap-2">
      <Loader />
      <Loader />
      <Loader />
      <Loader />
      <Loader />
    </div>
  );
};

const Loader = () => {
  return (
    <div
      className={cn(
        'bg-white',
        'rounded-xl',
        'p-3',
        'shadow-sm',
        'border',
        'border-uranian/20',
        'hover:shadow-md',
        'transition-shadow',
      )}
    >
      <div className="flex gap-3">
        <div className="p-2 rounded-lg bg-uranian/10 h-fit">
          <Skeleton className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-6 w-1/4" />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-full my-1" />
            <div className="flex items-center gap-1.5 text-xs text-secondary">
              <Skeleton className="h-2 w-1/2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
