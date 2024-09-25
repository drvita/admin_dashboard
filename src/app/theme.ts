'use client';

import { createTheme, PaletteMode } from '@mui/material/styles';

const colors = {
  azulMarino: '#0A2647',
  azulCielo: '#3498db',
  grisClaro: '#f5f5f5',
  blanco: '#ffffff',
  verdeMenta: '#2ecc71',
  rojoSuave: '#e74c3c',
  grisOscuro: '#333333',
  negroSuave: '#121212',
};

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: colors.azulMarino,
            light: colors.azulCielo,
          },
          secondary: {
            main: colors.azulCielo,
          },
          background: {
            default: colors.grisClaro,
            paper: colors.blanco,
          },
          text: {
            primary: colors.azulMarino,
            secondary: colors.azulCielo,
          },
        }
      : {
          primary: {
            main: colors.azulCielo,
            light: colors.azulMarino,
          },
          secondary: {
            main: colors.verdeMenta,
          },
          background: {
            default: colors.negroSuave,
            paper: colors.grisOscuro,
          },
          text: {
            primary: colors.blanco,
            secondary: colors.grisClaro,
          },
        }),
    success: {
      main: colors.verdeMenta,
    },
    error: {
      main: colors.rojoSuave,
    },
  },
});
const theme = (mode: PaletteMode) => createTheme({
  ...getDesignTokens(mode),
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: 'Merriweather, serif',
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: 'Merriweather, serif',
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: 'Merriweather, serif',
      fontWeight: 300,
      fontSize: '1.75rem',
      lineHeight: 1.2,
    },
    h4: {
      fontFamily: 'Merriweather, serif',
      fontWeight: 300,
      fontSize: '1.5rem',
      lineHeight: 1.2,
    },
    body1: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: 1.75,
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html {
          font-size: 16px;
        }
        body {
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          line-height: 1.5;
          color: ${colors.azulMarino};
          background-color: ${colors.grisClaro};
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        containedPrimary: {
          backgroundColor: colors.azulCielo,
          '&:hover': {
            backgroundColor: colors.azulMarino,
          },
        },
        containedSecondary: {
          backgroundColor: colors.verdeMenta,
          color: colors.blanco,
          '&:hover': {
            backgroundColor: '#27ae60', // Un tono más oscuro de verde menta
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.azulMarino,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: colors.blanco,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: colors.azulCielo,
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: colors.azulCielo,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: colors.azulCielo,
          '&:hover': {
            color: colors.azulMarino,
          },
        },
      },
    },
  },
});
export default theme;