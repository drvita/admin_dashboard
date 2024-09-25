'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Snackbar, Alert, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useTheme } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslations } from 'next-intl';
import { logoutAction } from '@/app/actions/logoutAction';

interface LogoutButtonProps {
  variant?: 'button' | 'menuItem';
  onClose?: () => void;
}

// Este componente se renderiza en el servidor y maneja las traducciones
const LogoutButton: React.FC<LogoutButtonProps> = (props) => {
  const t = useTranslations('LogoutButton');

  return <LogoutButtonClient {...props} translations={t} />;
};

// Este componente se renderiza en el cliente y maneja el tema y la lógica del diálogo
const LogoutButtonClient: React.FC<LogoutButtonProps & { translations: any }> = ({ variant = 'button', onClose, translations: t }) => {
  const router = useRouter();
  const theme = useTheme();

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleLogoutClick = () => {
    setConfirmDialogOpen(true);
    if (onClose) {
      onClose();
    }
  };

  const handleConfirmLogout = async () => {
    setConfirmDialogOpen(false);
    const result = await logoutAction();
    if (result.success) {
      setSnackbar({
        open: true,
        message: t('logoutSuccess'),
        severity: 'success',
      });
    } else {
      setSnackbar({
        open: true,
        message: t('logoutError'),
        severity: 'error',
      });
    }
  };

  const handleCancelLogout = () => {
    setConfirmDialogOpen(false);
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
    router.push('/login');
  };

  const renderLogoutButton = () => {
    if (variant === 'menuItem') {
      return (
        <MenuItem onClick={handleLogoutClick} sx={{ color: 'inherit' }}>
          <LogoutIcon sx={{ mr: 1 }} />
          {t('logoutButton')}
        </MenuItem>
      );
    }

    return (
      <Button
        onClick={handleLogoutClick}
        variant="contained"
        color="secondary"
        startIcon={<LogoutIcon />}
      >
        {t('logoutButton')}
      </Button>
    );
  };

  return (
    <>
      {renderLogoutButton()}
      <Dialog
        open={confirmDialogOpen}
        onClose={handleCancelLogout}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{t('logoutConfirmTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ color: theme.palette.text.secondary }}>
            {t('logoutConfirmMessage')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} color="primary">
            {t('cancel')}
          </Button>
          <Button onClick={handleConfirmLogout} color="primary" autoFocus>
            {t('confirm')}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LogoutButton;