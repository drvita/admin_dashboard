'use client';

import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Avatar, Tooltip, useTheme } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { User } from '@/lib/interfaces';
import LogoutButton from '@/app/[locale]/components/auth/LogoutButton';

interface UserMenuButtonProps {
  userProfile: User | null;
  profileText: string;
  settingsText: string;
  accountMenuLabel: string;
  genericUserText: string;
}

const UserMenuButton: React.FC<UserMenuButtonProps> = ({
  userProfile,
  profileText,
  settingsText,
  accountMenuLabel,
  genericUserText
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const avatarContent = userProfile?.name ? userProfile.name[0].toUpperCase() : 'G';
  const tooltipTitle = userProfile?.name || genericUserText;

  const menuItems = userProfile ? [
    <MenuItem key="profile" onClick={handleClose} sx={{ color: 'inherit' }}>
      <PersonIcon sx={{ mr: 1 }} />
      {profileText}
    </MenuItem>,
    <MenuItem key="settings" onClick={handleClose} sx={{ color: 'inherit' }}>
      <SettingsIcon sx={{ mr: 1 }} />
      {settingsText}
    </MenuItem>,
    <LogoutButton key="logout" variant="menuItem" onClose={handleClose} />
  ] : [];

  return (
    <>
      <Tooltip title={tooltipTitle}>
        <IconButton
          size="large"
          aria-label={accountMenuLabel}
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <Avatar sx={{ width: 32, height: 32, bgcolor: userProfile ? 'primary.main' : 'grey.500' }}>
            {avatarContent}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          },
        }}
      >
        {menuItems}
      </Menu>
    </>
  );
};

export default UserMenuButton;