'use client';

import React from 'react';
import dynamic from 'next/dynamic';

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  href: string;
}

interface SidebarClientProps {
  menuItems: MenuItem[];
  searchPlaceholder: string;
  userProfileContent: React.ReactNode;
}

const DynamicSidebar = dynamic(() => import('./DynamicSidebar'), {
  ssr: false,
});

const SidebarClient: React.FC<SidebarClientProps> = ({ menuItems, searchPlaceholder, userProfileContent }) => {
  return (
    <DynamicSidebar 
      menuItems={menuItems} 
      searchPlaceholder={searchPlaceholder}
      userProfileContent={userProfileContent}
    />
  );
};

export default SidebarClient;