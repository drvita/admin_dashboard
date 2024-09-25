'use client';

import React, { useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { ThemeProvider as CustomThemeProvider, useTheme } from './ThemeContext';
import { EmotionProvider } from './EmotionProvider';

const ThemedContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { mode } = useTheme();
  const themeWithMode = React.useMemo(() => theme(mode), [mode]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }, [mode]);

  return (
    <MuiThemeProvider theme={themeWithMode}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <EmotionProvider options={{ key: 'mui' }}>
      <CustomThemeProvider>
        <ThemedContent>{children}</ThemedContent>
      </CustomThemeProvider>
    </EmotionProvider>
  );
}