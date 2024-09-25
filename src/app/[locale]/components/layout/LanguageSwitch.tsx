'use client';

import { IconButton, Tooltip } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import LanguageIcon from '@mui/icons-material/Language';

const LanguageSwitch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const toggleLanguage = () => {
    const newLocale = locale === 'es' ? 'en' : 'es';
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <Tooltip title={locale === 'es' ? 'Switch to English' : 'Cambiar a Español'}>
      <IconButton 
        onClick={toggleLanguage} 
        size="small"
        sx={{
          '&:hover': {
            backgroundColor: 'action.hover',
            transition: 'all 0.3s ease-in-out',
          },
        }}
      >
        <LanguageIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default LanguageSwitch;