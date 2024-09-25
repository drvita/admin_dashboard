'use client';

import React from 'react';
import { Container, Box, Paper, useTheme } from '@mui/material';
import ThemeToggleButton from '@/app/ThemeToggleButton';

export default function ClientLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();

  return (
    <Container 
      component="main" 
      disableGutters 
      sx={{
        minHeight: { xs: '100%', sm: '100dvh' },
        width: '100%',
        maxWidth: '100% !important',
        padding: { xs: 0, sm: 3 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'auto',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Paper 
        elevation={3} 
        sx={{
          width: '100%',
          height: { xs: '100%', sm: 'auto' },
          maxWidth: {
            xs: '100%',
            sm: '600px'
          },
          borderRadius: {
            xs: 0,
            sm: 2
          },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'auto',
          my: 3,
          boxShadow: { xs: 'none', sm: 3 },
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          position: 'relative', // Añadido para posicionar el botón
        }}
      >
        {/* Botón de cambio de tema */}
        <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
          <ThemeToggleButton />
        </Box>

        <Box
          sx={{
            padding: {
              xs: 2,
              sm: 4
            },
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
          }}
        >
          {children}
        </Box>
      </Paper>
    </Container>
  );
}