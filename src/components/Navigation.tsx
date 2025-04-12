'use client';

import { Settings, ReceiptText, HandCoins } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const navigationItems = [
  // {
  //   href: '/stats',
  //   icon: StatsIcon,
  //   label: 'Estadística',
  // },
  // {
  //   href: '/credit',
  //   icon: CreditIcon,
  //   label: 'Créditos',
  // },
  {
    href: '/expense',
    icon: ReceiptText,
    label: 'Gastos',
  },
  {
    href: '/income',
    icon: HandCoins,
    label: 'Ingresos',
  },
  // {
  //   href: '/config',
  //   icon: Settings,
  //   label: 'Config',
  // },
  // {
  //   href: '/income',
  //   icon: IncomeIcon,
  //   label: 'Ingresos',
  // },
  // {
  //   href: '/profile',
  //   icon: ProfileIcon,
  //   label: 'Perfil',
  // },
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
              'text-tertiary',
              'animate-fade-up animate-once animate-duration-1000 animate-ease-in-out',
            )}
          >
            <Icon
              className={cn(pathname.includes(href) ? undefined : 'opacity-25')}
            />
            <span
              className={cn(
                'text-xs',
                'font-medium',
                pathname.includes(href) ? undefined : 'opacity-70',
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
