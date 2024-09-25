'use client';

import React from 'react';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import NextLink from 'next/link';

interface NavBarLinkClientProps {
  href: string;
  text: string;
}

const NavBarLinkClient: React.FC<NavBarLinkClientProps> = ({ href, text }) => {
  const theme = useTheme();

  return (
    <NextLink href={href} passHref legacyBehavior>
      <Typography
        component="a"
        sx={{
          color: theme.palette.primary.contrastText,
          marginRight: 2,
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        {text}
      </Typography>
    </NextLink>
  );
};

export default NavBarLinkClient;