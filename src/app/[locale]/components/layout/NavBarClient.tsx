'use client';

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, useTheme, IconButton, useMediaQuery, Drawer, List, ListItem } from '@mui/material';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import NavBarLinkClient from './NavBarLinkClient';
import ThemeToggleButton from '@/app/ThemeToggleButton';

interface NavItem {
  href: string;
  text: string;
}

interface NavBarClientProps {
  navItems: NavItem[];
  logoText: string;
  tooltipTheme: string;
  userMenuButton: React.ReactNode;
}

const NavBarClient: React.FC<NavBarClientProps> = ({ navItems, logoText, userMenuButton, tooltipTheme }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.light }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/dashboard" style={{ color: theme.palette.primary.contrastText, textDecoration: 'none' }}>
            {logoText}
          </Link>
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleMobileMenu}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={mobileMenuOpen}
              onClose={toggleMobileMenu}
              sx={{
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: '100%',
                  backgroundColor: theme.palette.primary.light,
                },
              }}
            >
              <List>
                {navItems.map((item) => (
                  <ListItem key={item.href} onClick={toggleMobileMenu}>
                    <NavBarLinkClient href={item.href} text={item.text} />
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </>
        ) : (
          <Box component="nav" sx={{ display: 'flex', alignItems: 'center' }}>
            {navItems.map((item) => (
              <NavBarLinkClient key={item.href} href={item.href} text={item.text} />
            ))}
          </Box>
        )}
        {!isMobile && <ThemeToggleButton tooltipTheme={tooltipTheme} />}
        {userMenuButton}
      </Toolbar>
    </AppBar>
  );
};

export default NavBarClient;