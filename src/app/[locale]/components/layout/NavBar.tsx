import React from 'react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { getUserProfile } from '@/lib/userProfileUtils';
import { User } from '@/lib/interfaces';

const NavBarClient = dynamic(() => import('./NavBarClient'), {
  ssr: false,
});

const UserMenuButton = dynamic(() => import('./UserMenuButton'), {
  ssr: false,
});

const NavBar: React.FC = async () => {
  const t = useTranslations('Layout');
  const userProfile: User | null = await getUserProfile();

  const navItems = [
    { href: '/dashboard/facturacion', text: t('navigation.billing') },
    { href: '/dashboard/customers', text: t('navigation.clients') },
    { href: '/dashboard/reportes', text: t('navigation.reports') },
  ];

  return (
    <NavBarClient 
      navItems={navItems}
      logoText="InvoiceMX"
      tooltipTheme={t('navigation.tooltipTheme')}
      userMenuButton={
        <UserMenuButton 
          userProfile={userProfile}
          profileText={t('userMenu.profile')}
          settingsText={t('userMenu.settings')}
          accountMenuLabel={t('userMenu.accountMenu')}
          genericUserText={t('userMenu.genericUser')}
        />
      }
    />
  );
};

export default NavBar;