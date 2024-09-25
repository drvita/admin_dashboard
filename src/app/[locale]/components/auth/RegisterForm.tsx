'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  TextField,
  Button,
  Typography,
  Link,
  Box,
  InputAdornment,
  CircularProgress,
  IconButton,
  Snackbar,
  Alert,
  AlertColor
} from '@mui/material';
import { useRouter } from 'next/navigation';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { registerAction } from '@/app/actions/registerAction';

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}
interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

const RegisterForm: React.FC = () => {
  const t = useTranslations('Register');
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: undefined
      }));
    }
  };
  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    console.log('Forma saved');
    setLoading(false);
    setSnackbar({ ...snackbar, open: false });
    router.push('/dashboard');
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const result = await registerAction(formData);
    if (!result.success) {
      setErrors(result.errors as FormErrors);
    }

    setSnackbar({
      open: true,
      message: result.success ? t('registrationSuccess') : t('registrationFailed'),
      severity: result.success ? 'success' : 'error',
    });
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        margin: 'auto',
        padding: { xs: 2, sm: 3 },
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        sx={{
          fontSize: {
            xs: '1.5rem',
            sm: '2rem'
          },
          mb: 3
        }}
      >
        {t('title')}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: 2,
          }}
        >
          <Box sx={{ gridColumn: { xs: '1', sm: '1 / span 2' } }}>
            <TextField
              required
              fullWidth
              id="name"
              label={t('name')}
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiInputBase-root': { fontSize: '1rem' },
                '& .MuiInputLabel-root': { fontSize: '1rem' },
              }}
            />
          </Box>
          <Box>
            <TextField
              required
              fullWidth
              id="email"
              label={t('email')}
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiInputBase-root': { fontSize: '1rem' },
                '& .MuiInputLabel-root': { fontSize: '1rem' },
              }}
            />
          </Box>
          <Box>
            <TextField
              required
              fullWidth
              name="password"
              label={t('password')}
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiInputBase-root': { fontSize: '1rem' },
                '& .MuiInputLabel-root': { fontSize: '1rem' },
              }}
            />
          </Box>
        </Box>

        <Typography variant="body2" sx={{
          mt: 2,
          mb: 2,
          fontSize: '0.875rem'
        }}>
          {t('privacyPolicy')} <Link href="/privacy-policy">{t('privacyPolicyLink')}</Link>
        </Typography>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{
            mt: 2,
            mb: 2,
            py: 1.5,
            fontSize: '1rem'
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            t('submit')
          )}
        </Button>
      </form>

      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mt: 2,
        flexDirection: {
          xs: 'column',
          sm: 'row'
        },
        alignItems: 'center',
        '& > *': {
          mb: {
            xs: 1,
            sm: 0
          }
        }
      }}>
        <Link
          href="/login"
          onClick={() => router.push('/login')}
          variant="body2"
          sx={{ fontSize: '0.875rem' }}
        >
          {t('backToLogin')}
        </Link>
        <Link
          href="/"
          onClick={() => router.push('/')}
          variant="body2"
          sx={{ fontSize: '0.875rem' }}
        >
          {t('backToHome')}
        </Link>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegisterForm;