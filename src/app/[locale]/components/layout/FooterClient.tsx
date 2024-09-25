'use client';

import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import LanguageSwitch from './LanguageSwitch';

interface FooterContent {
  contact: string;
  privacyPolicy: string;
}

interface FooterClientProps {
  content: FooterContent;
}

const FooterClient: React.FC<FooterClientProps> = ({ content }) => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        mt: 'auto', 
        py: 1, 
        px: 2, 
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
      }} 
      className="flex justify-between items-center"
    >
      <Typography variant="caption" color="text.secondary">
        {content.contact} | 
        <Link href="/privacy-policy" color="inherit" sx={{ ml: 1 }}>
          {content.privacyPolicy}
        </Link>
      </Typography>
      <LanguageSwitch />
    </Box>
  );
};

export default FooterClient;