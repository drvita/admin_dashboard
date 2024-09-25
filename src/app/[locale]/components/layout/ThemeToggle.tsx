import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { PaletteMode, Switch, FormControlLabel } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

interface ThemeToggleProps {
  children: React.ReactNode;
  onThemeChange: (mode: PaletteMode) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ children, onThemeChange }) => {
  const theme = useTheme();
  const [mode, setMode] = useState<PaletteMode>(theme.palette.mode);
  const [isSystemTheme, setIsSystemTheme] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (isSystemTheme) {
        const newMode = e.matches ? 'dark' : 'light';
        setMode(newMode);
        onThemeChange(newMode);
      }
    };

    if (isSystemTheme) {
      setMode(mediaQuery.matches ? 'dark' : 'light');
      onThemeChange(mediaQuery.matches ? 'dark' : 'light');
    }

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isSystemTheme, onThemeChange]);

  const handleToggle = () => {
    setIsSystemTheme(false);
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    onThemeChange(newMode);
  };

  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={mode === 'dark'}
            onChange={handleToggle}
            icon={<Brightness7 />}
            checkedIcon={<Brightness4 />}
          />
        }
        label={mode === 'dark' ? 'Modo oscuro' : 'Modo claro'}
      />
      {children}
    </>
  );
};

export default ThemeToggle;