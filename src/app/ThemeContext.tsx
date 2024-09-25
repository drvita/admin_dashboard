import React, { createContext, useContext, useCallback } from 'react';
import { PaletteMode } from '@mui/material';
import usePersistentState from '@/app/hooks/usePersistentState';

type ThemeContextType = {
  mode: PaletteMode;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getInitialTheme = (): PaletteMode => {
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = usePersistentState<PaletteMode>('theme', getInitialTheme());

  const toggleTheme = useCallback(() => {
    setMode((prevMode: PaletteMode): PaletteMode => {
      const newMode: PaletteMode = prevMode === 'light' ? 'dark' : 'light';
      return newMode;
    });
  }, [setMode]);

  const contextValue: ThemeContextType = {
    mode,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;