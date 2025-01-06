import { ReactNode } from 'react';

import { Navigation } from '@/components/Navigation';
import { QueryWrapper } from '@/components/QueryWrapper';

import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'EasyBalance',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white">
        <QueryWrapper>
          {children}
          <Navigation />
        </QueryWrapper>
      </body>
    </html>
  );
}
