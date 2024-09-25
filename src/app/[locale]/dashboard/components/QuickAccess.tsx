'use client';

import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';

interface QuickAccessProps {
  translations: {
    title: string;
    newInvoice: string;
    newClient: string;
    reports: string;
  };
}

const QuickAccess: React.FC<QuickAccessProps> = ({ translations }) => {
  const theme = useTheme();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const quickAccessButtons = [
    { key: 'newInvoice', icon: '📄', label: translations.newInvoice },
    { key: 'newClient', icon: '👤', label: translations.newClient },
    { key: 'reports', icon: '📊', label: translations.reports },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Box sx={{ typography: 'h6', color: theme.palette.text.primary }}>{translations.title}</Box>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        {quickAccessButtons.map(({ key, icon, label }) => (
          <Tooltip key={key} title={label} arrow>
            <Button
              variant="contained"
              onMouseEnter={() => setHoveredButton(key)}
              onMouseLeave={() => setHoveredButton(null)}
              sx={{
                width: 80,
                height: 90,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
                boxShadow: hoveredButton === key ? 4 : 2,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                '&:hover': {
                  bgcolor: theme.palette.primary.dark,
                },
                '& .icon': {
                  fontSize: '1.5rem',
                  transition: 'transform 0.3s',
                },
                '&:hover .icon': {
                  transform: 'scale(1.2) rotate(10deg)',
                },
              }}
            >
              <span className="icon">{icon}</span>
              <Box sx={{ fontSize: '0.75rem', mt: 1 }}>{label}</Box>
            </Button>
          </Tooltip>
        ))}
      </Box>
    </Paper>
  );
};

export default QuickAccess;