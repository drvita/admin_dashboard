'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';

interface MembershipStatusProps {
  translations: {
    title: string;
    currentLevel: string;
    nextLevel: string;
    pointsToNext: string;
    viewDetails: string;
  };
}

const MembershipStatus: React.FC<MembershipStatusProps> = ({ translations }) => {
  const theme = useTheme();
  const [progress, setProgress] = useState(0);

  // Mock data
  const currentLevel = 'Silver';
  const nextLevel = 'Gold';
  const currentPoints = 750;
  const pointsToNextLevel = 1000;

  useEffect(() => {
    // Simulate progress update
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, (currentPoints / pointsToNextLevel) * 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

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
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" color="primary">
          {currentLevel}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {translations.nextLevel}: {nextLevel}
        </Typography>
      </Box>
      <Box sx={{ width: '100%', mb: 2 }}>
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{
            height: 10,
            borderRadius: 5,
            '& .MuiLinearProgress-bar': {
              borderRadius: 5,
              transition: 'transform 0.1s ease',
            },
          }}
        />
      </Box>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        {translations.pointsToNext}: {pointsToNextLevel - currentPoints}
      </Typography>
      <Box sx={{ mt: 'auto' }}>
        <Button variant="outlined" color="primary" fullWidth>
          {translations.viewDetails}
        </Button>
      </Box>
    </Paper>
  );
};

export default MembershipStatus;