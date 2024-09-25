import React from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';
import ClientLayout from './ClientLayout';

export default function AuthLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return <ClientLayout>{children}</ClientLayout>;
}