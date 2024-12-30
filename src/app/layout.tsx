import { ReactNode } from 'react';

import { Navigation } from '@/components/Navigation';

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
        {children}
        <Navigation />
      </body>
    </html>
  );
}
