import React, { useState } from 'react';
import { Drawer, List, IconButton, useMediaQuery, useTheme, Box } from '@mui/material';
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import SidebarLinkClient from './SidebarLinkClient';
import usePersistentState from '@/app/hooks/usePersistentState';

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  href: string;
}

interface DynamicSidebarProps {
  menuItems: MenuItem[];
  searchPlaceholder: string;
  userProfileContent: React.ReactNode;
}

const DynamicSidebar: React.FC<DynamicSidebarProps> = ({ menuItems, userProfileContent }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isOpen, setIsOpen] = useState<boolean>(!isMobile);
  const [isCompact, setIsCompact] = usePersistentState<boolean>('sidebarIsCompact', false);

  const handleDrawerToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCompactToggle = () => {
    setIsCompact(!isCompact);
  };

  const drawerWidth = isCompact ? 70 : 240;

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          left: isOpen ? drawerWidth : 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: theme.zIndex.drawer + 1,
          transition: theme.transitions.create(['left'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {isMobile && (
          <IconButton
            color="primary"
            aria-label="toggle drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              backgroundColor: theme.palette.background.paper,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
              boxShadow: 2,
            }}
          >
            {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        )}
      </Box>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isOpen}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            transition: theme.transitions.create(['width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            display: 'flex',
            flexDirection: 'column',
            height: '100%', // Asegura que el drawer ocupe toda la altura
            overflowY: 'hidden', // Oculta el scroll vertical
          },
        }}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%', // Ocupa toda la altura del drawer
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
            <IconButton onClick={handleCompactToggle}>
              {isCompact ? <MenuIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </Box>
          {!isCompact && userProfileContent}
          <List sx={{
            paddingTop: 0,
            overflowY: 'auto', // Permite scroll solo si es necesario
            flexGrow: 1, // Ocupa el espacio restante
            '&::-webkit-scrollbar': {
              display: 'none', // Oculta la barra de scroll en navegadores WebKit
            },
            scrollbarWidth: 'none', // Oculta la barra de scroll en Firefox
          }}>
            {menuItems.map((item) => (
              <SidebarLinkClient
                key={item.href}
                href={item.href}
                icon={item.icon}
                text={item.text}
                isCompact={isCompact}
              />
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default DynamicSidebar;