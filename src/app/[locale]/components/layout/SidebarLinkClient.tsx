'use client';

import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import NextLink from 'next/link';

interface SidebarLinkClientProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  isCompact: boolean;
}

const SidebarLinkClient: React.FC<SidebarLinkClientProps> = ({ href, icon, text, isCompact }) => {
  const theme = useTheme();

  const linkContent = (
    <ListItemButton
      component="a"
      sx={{
        color: theme.palette.text.primary,
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
        justifyContent: text ? 'initial' : 'center',
        paddingLeft: text ? undefined : theme.spacing(1.5),
        paddingRight: text ? undefined : theme.spacing(1.5),
      }}
    >
      <ListItemIcon sx={{ color: theme.palette.primary.main, minWidth: text ? 56 : 'auto' }}>
        {icon}
      </ListItemIcon>
      {!isCompact && <ListItemText primary={text} primaryTypographyProps={{ color: theme.palette.text.primary }} />}
    </ListItemButton>
  );

  return (
    <NextLink href={href} passHref legacyBehavior>
      {!isCompact ? (
        linkContent
      ) : (
        <Tooltip title={text} placement="right">
          {linkContent}
        </Tooltip>
      )}
    </NextLink>
  );
};

export default SidebarLinkClient;