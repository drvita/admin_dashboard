import React from 'react';
import { Box } from '@mui/material';
import NavBar from '@/app/[locale]/components/layout/NavBar';
import Sidebar from '@/app/[locale]/components/layout/Sidebar';
import Footer from '@/app/[locale]/components/layout/Footer';
import { useTranslations } from 'next-intl';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('Layout');

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        flexGrow: 1, 
        width: '100%', 
        overflow: 'hidden' // Previene el scroll en este contenedor
      }}>
        <NavBar />
        <Box component="main" sx={{ 
          flexGrow: 1, 
          p: 3, 
          mt: { xs: '7px', sm: '12px' },
          overflowX: 'hidden', // Oculta el scroll horizontal
          overflowY: 'auto', // Permite scroll vertical si es necesario
          width: '100%', // Asegura que tome todo el ancho disponible
        }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}