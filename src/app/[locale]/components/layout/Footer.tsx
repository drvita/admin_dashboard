import React from 'react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

const FooterClient = dynamic(() => import('./FooterClient'), {
  ssr: false,
});

const FooterServer = () => {
  const t = useTranslations('Layout.footer');

  const footerContent = {
    contact: t('contact'),
    privacyPolicy: t('privacyPolicy'),
  };

  return <FooterClient content={footerContent} />;
};

export default FooterServer;