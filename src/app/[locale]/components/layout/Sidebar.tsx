import React from 'react';
import { useTranslations } from 'next-intl';
import { Description, People, BarChart } from '@mui/icons-material';
import SidebarClient from './SidebarClient';
import UserProfileSidebarContent from './UserProfileSidebarContent';
import { getUserProfile } from '@/lib/userProfileUtils';

const Sidebar: React.FC = async () => {
  const t = useTranslations('Layout.sidebar');

  const menuItems = [
    { text: t('newInvoice'), icon: <Description />, href: '/dashboard/nueva-factura' },
    { text: t('manageClients'), icon: <People />, href: '/dashboard/clientes' },
    { text: t('financialAnalysis'), icon: <BarChart />, href: '/dashboard/analisis' },
  ];

  const userProfile = await getUserProfile();

  const userProfileContent = userProfile ? (
    <UserProfileSidebarContent 
      userProfile={userProfile}
      membershipText={t('membership', { role: userProfile.roles[0] })}
    />
  ) : null;

  return (
    <SidebarClient 
      menuItems={menuItems} 
      searchPlaceholder={t('search')}
      userProfileContent={userProfileContent}
    />
  );
};

export default Sidebar;