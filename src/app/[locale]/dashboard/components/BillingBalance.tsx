'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import NotificationsIcon from '@mui/icons-material/Notifications';

interface BillingBalanceProps {
  translations: {
    title: string;
    currentBalance: string;
    totalBalance: string;
    setAlert: string;
    alertDialogTitle: string;
    alertThreshold: string;
    save: string;
    cancel: string;
  };
}

const BillingBalance: React.FC<BillingBalanceProps> = ({ translations }) => {
  const theme = useTheme();
  const [currentBalance, setCurrentBalance] = useState(5000);
  const totalBalance = 10000;
  const [progress, setProgress] = useState(0);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [alertThreshold, setAlertThreshold] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = (currentBalance / totalBalance) * 100;
        return Math.min(newProgress, 100);
      });
    }, 20);
    return () => {
      clearInterval(timer);
    };
  }, [currentBalance, totalBalance]);

  const handleSetAlert = () => {
    setIsAlertDialogOpen(true);
  };

  const handleCloseAlertDialog = () => {
    setIsAlertDialogOpen(false);
  };

  const handleSaveAlert = () => {
    // Here you would typically save the alert threshold to your backend
    console.log(`Alert set for $${alertThreshold}`);
    setIsAlertDialogOpen(false);
  };

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
      <Box sx={{ position: 'relative', display: 'inline-flex', my: 2 }}>
        <CircularProgress
          variant="determinate"
          value={progress}
          size={120}
          thickness={4}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h5" component="div" color="text.secondary">
            ${currentBalance}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" color="textSecondary">
        {translations.currentBalance}: ${currentBalance}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {translations.totalBalance}: ${totalBalance}
      </Typography>
      <Button
        startIcon={<NotificationsIcon />}
        onClick={handleSetAlert}
        sx={{ mt: 2 }}
      >
        {translations.setAlert}
      </Button>
      <Dialog open={isAlertDialogOpen} onClose={handleCloseAlertDialog}>
        <DialogTitle>{translations.alertDialogTitle}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="alertThreshold"
            label={translations.alertThreshold}
            type="number"
            fullWidth
            variant="standard"
            value={alertThreshold}
            onChange={(e) => setAlertThreshold(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlertDialog}>{translations.cancel}</Button>
          <Button onClick={handleSaveAlert}>{translations.save}</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default BillingBalance;