import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from './ThemeContext';

interface ThemeProps {
  tooltipTheme: string
}

const ThemeToggleButton: React.FC<ThemeProps> = ({ tooltipTheme }) => {
  const { mode, toggleTheme } = useTheme();

  return (
    <Tooltip title={tooltipTheme}>
      <IconButton onClick={toggleTheme} color="inherit">
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggleButton;