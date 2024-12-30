'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { BillIcon } from '@/assets/icons/bill';
import { CreditIcon } from '@/assets/icons/credit';
import { IncomeIcon } from '@/assets/icons/income';
import { ProfileIcon } from '@/assets/icons/profile';
import { StatsIcon } from '@/assets/icons/stats';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    href: '/stats',
    icon: StatsIcon,
    label: 'Estadística',
  },
  {
    href: '/credit',
    icon: CreditIcon,
    label: 'Créditos',
  },
  {
    href: '/bills',
    icon: BillIcon,
    label: 'Gastos',
  },
  {
    href: '/income',
    icon: IncomeIcon,
    label: 'Ingresos',
  },
  {
    href: '/profile',
    icon: ProfileIcon,
    label: 'Perfil',
  },
];

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'fixed',
        'w-full',
        'py-4',
        'bottom-0 border border-t border-solid border-primary/[0.1]',
        'bg-bgWhite',
      )}
    >
      <div className="flex gap-2 w-full justify-between px-4">
        {navigationItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex',
              'flex-col',
              'justify-center',
              'items-center',
              'gap-1.5',
              'animate-fade-up animate-once animate-duration-1000 animate-ease-in-out',
            )}
          >
            <Icon
              className={cn(pathname.includes(href) ? undefined : 'opacity-25')}
            />
            <span
              className={cn(
                'text-xs',
                'text-tertiary',
                'font-medium',
                pathname.includes(href) ? undefined : 'opacity-80',
              )}
            >
              {label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};
