import { useTranslations } from 'next-intl';
import CustomersPageClient from './CustomersPageClient';

export default function CustomersPage() {
  const t = useTranslations('CustomersPage');

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>
      <CustomersPageClient />
    </div>
  );
}