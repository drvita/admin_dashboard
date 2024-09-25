'use client';

import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { LineChart } from '@mui/x-charts/LineChart';

interface TotalBilledAmountProps {
  translations: {
    title: string;
    currentMonth: string;
    lastMonth: string;
    tooltipText: string;
  };
}

const TotalBilledAmount: React.FC<TotalBilledAmountProps> = ({ translations }) => {
  const theme = useTheme();

  // Mock data for the chart
  const data = [
    { day: 1, last: 4000, current: 2400 },
    { day: 5, last: 3000, current: 1398 },
    { day: 10, last: 2000, current: 9800 },
    { day: 15, last: 2780, current: 3908 },
    { day: 20, last: 1890, current: 4800 },
    { day: 25, last: 2390, current: 3800 },
    { day: 30, last: 3490, current: 4300 },
  ];

  const currentTotal = data.reduce((sum, item) => sum + item.current, 0);
  const lastTotal = data.reduce((sum, item) => sum + item.last, 0);
  const percentageChange = ((currentTotal - lastTotal) / lastTotal) * 100;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h6" color="textPrimary" gutterBottom>
        {translations.title}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4" color="textPrimary">
          ${currentTotal.toLocaleString()}
        </Typography>
        <Tooltip title={translations.tooltipText} arrow>
          <Typography
            variant="body2"
            color={percentageChange >= 0 ? 'success.main' : 'error.main'}
          >
            {percentageChange >= 0 ? '+' : ''}{percentageChange.toFixed(2)}%
          </Typography>
        </Tooltip>
      </Box>
      <Box sx={{ flexGrow: 1, minHeight: 200 }}>
        <LineChart
          xAxis={[{ 
            data: data.map(item => item.day),
            scaleType: 'linear',
            valueFormatter: (v) => `Day ${v}`,
          }]}
          series={[
            {
              data: data.map(item => item.current),
              label: translations.currentMonth,
              color: theme.palette.primary.main,
            },
            {
              data: data.map(item => item.last),
              label: translations.lastMonth,
              color: theme.palette.secondary.main,
            },
          ]}
          height={200}
          margin={{ top: 10, bottom: 20, left: 40, right: 10 }}
        />
      </Box>
    </Paper>
  );
};

export default TotalBilledAmount;