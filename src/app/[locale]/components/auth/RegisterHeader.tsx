import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import ClientSideImage from "@/app/[locale]/components/auth/RegisterHeader";

const RegisterHeader: React.FC = () => {
  const t = useTranslations('Register');

  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 4,
        width: '100%'
      }}
    >
      <ClientSideImage />
      <Typography 
        variant="h5" 
        sx={{ 
          fontFamily: 'Merriweather, serif', 
          fontWeight: 300,
          fontSize: {
            xs: '1.1rem',
            sm: '1.5rem'
          },
          textAlign: 'center',
          maxWidth: '90%',
          mx: 'auto'
        }}
      >
        {t('motto')}
      </Typography>
    </Box>
  );
};

export default RegisterHeader;