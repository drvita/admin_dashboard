import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

const RegisterHeaderImage: React.FC = () => {
  return (
    <Box 
      sx={{ 
        position: 'relative',
        width: {
          xs: '300px',
          sm: '400px'
        },
        height: {
          xs: '100px',
          sm: '130px'
        },
        mb: 2
      }}
    >
      <Image
        src="/logo_h_trans.png"
        alt="InvoiceMx Logo"
        fill
        style={{
          objectFit: 'contain'
        }}
        priority
      />
    </Box>
  );
};

export default RegisterHeaderImage;