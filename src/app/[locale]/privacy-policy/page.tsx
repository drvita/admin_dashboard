'use client';

import React, { useState, useCallback } from 'react';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Container,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Link,
  Divider,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import ThemeToggleButton from '@/app/ThemeToggleButton';

// Componente para la sección de políticas
const PolicySection: React.FC<{ title: string; content: React.ReactNode; id: string }> = ({ title, content, id }) => (
  <Box my={4} id={id}>
    <Typography variant="h2" gutterBottom>
      {title}
    </Typography>
    {content}
  </Box>
);

// Componente para el índice de navegación
const NavigationIndex: React.FC<{ sections: { id: string; title: string }[] }> = ({ sections }) => (
  <Box my={4}>
    <Typography variant="h3" gutterBottom>
      Índice
    </Typography>
    <List>
      {sections.map((section) => (
        <ListItem key={section.id} dense>
          <Link href={`#${section.id}`} color="inherit">
            <ListItemText primary={section.title} />
          </Link>
        </ListItem>
      ))}
    </List>
  </Box>
);

// Componente principal de la página de políticas de privacidad
const PrivacyPolicyPage: React.FC = () => {
  const baseTheme = useTheme();
  const router = useRouter();
  const t = useTranslations('PrivacyPolicy');
  const isMobile = useMediaQuery(baseTheme.breakpoints.down('sm'));
  const [fontScale, setFontScale] = useState(1);

  const increaseFontSize = useCallback(() => {
    setFontScale((prevScale) => Math.min(prevScale + 0.1, 1.5));
  }, []);

  const decreaseFontSize = useCallback(() => {
    setFontScale((prevScale) => Math.max(prevScale - 0.1, 0.8));
  }, []);

  // Crear un nuevo tema basado en el tema base, pero con tamaños de fuente escalados
  const theme = React.useMemo(() => {
    return createTheme({
      ...baseTheme,
      typography: {
        ...baseTheme.typography,
        h1: {
          ...baseTheme.typography.h1,
          fontSize: `calc(${baseTheme.typography.h1.fontSize} * ${fontScale})`,
        },
        h2: {
          ...baseTheme.typography.h2,
          fontSize: `calc(${baseTheme.typography.h2.fontSize} * ${fontScale})`,
        },
        h3: {
          ...baseTheme.typography.h3,
          fontSize: `calc(${baseTheme.typography.h3.fontSize} * ${fontScale})`,
        },
        body1: {
          ...baseTheme.typography.body1,
          fontSize: `calc(${baseTheme.typography.body1.fontSize} * ${fontScale})`,
        },
        body2: {
          ...baseTheme.typography.body2,
          fontSize: `calc(${baseTheme.typography.body2.fontSize} * ${fontScale})`,
        },
      },
    });
  }, [baseTheme, fontScale]);

  const sections = [
    { id: 'responsible', title: '1. Datos del Responsable' },
    { id: 'data-collected', title: '2. Datos Recopilados' },
    { id: 'purpose', title: '3. Finalidad del Tratamiento' },
    { id: 'storage', title: '4. Almacenamiento y Seguridad de los Datos' },
    { id: 'third-party', title: '5. Comunicación de los Datos a Terceros' },
    { id: 'rights', title: '6. Derechos ARCO' },
    { id: 'security', title: '7. Seguridad de la Información' },
    { id: 'cookies', title: '8. Uso de Cookies' },
    { id: 'minors', title: '9. Uso por Menores de Edad' },
    { id: 'updates', title: '10. Actualización de la Política de Privacidad' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h1" gutterBottom>
            {t('title')}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {t('lastUpdated', { date: new Date().toLocaleDateString() })}
          </Typography>

          <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" mb={2}>
            <Box>
              <Button onClick={decreaseFontSize} variant="outlined" size="small" color="primary">
                A-
              </Button>
              <Button onClick={increaseFontSize} variant="outlined" size="small" sx={{ ml: 1 }} color="primary">
                A+
              </Button>
            </Box>
            
            <ThemeToggleButton />
          </Box>

          <NavigationIndex sections={sections} />

          <Divider />

          <Box>
            <PolicySection
              id="responsible"
              title="1. Datos del Responsable"
              content={
                <>
                  <Typography variant="body1" paragraph>
                    La presente política de privacidad regula el tratamiento de los datos personales proporcionados por los usuarios a través de la plataforma InvoiceMx.
                  </Typography>
                  <Typography variant="body1" component="div">
                    <strong>Responsable:</strong> Salvador González Galindo<br />
                    <strong>RFC:</strong> GOGS821216BV3<br />
                    <strong>Domicilio:</strong> Villa de Álvarez, Colima, CP 28984<br />
                    <strong>Correo electrónico:</strong> <Link href="mailto:chavagalindo@live.com.mx">chavagalindo@live.com.mx</Link>
                  </Typography>
                </>
              }
            />
            <PolicySection
              id="data-collected"
              title="2. Datos Recopilados"
              content={
                <>
                  <Typography variant="body1">
                    En InvoiceMx, recopilamos los siguientes tipos de datos personales:
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary={<strong>Datos identificativos:</strong>} secondary="nombre, apellidos, dirección, correo electrónico, RFC." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Información fiscal para la creación y timbrado de facturas." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Información relacionada con el uso de la plataforma, como historial de facturación." />
                    </ListItem>
                  </List>
                </>
              }
            />
            <PolicySection
              id="purpose"
              title="3. Finalidad del Tratamiento"
              content={
                <>
                  <Typography variant="body1">
                    Los datos proporcionados serán utilizados para los siguientes fines:
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="Operación de la plataforma, incluyendo la creación, timbrado y envío de facturas electrónicas." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Análisis comercial para mejorar los servicios ofrecidos." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Realización de campañas de marketing, cuando el usuario haya dado su consentimiento." />
                    </ListItem>
                  </List>
                </>
              }
            />
            <PolicySection
              id="storage"
              title="4. Almacenamiento y Seguridad de los Datos"
              content={
                <>
                  <Typography variant="body1">
                    Los datos serán almacenados en la nube con medidas de seguridad de cifrado. Esto asegura que la información no sea accesible a terceros no autorizados. Además:
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="La información fiscal se conservará durante 2 años en almacenamiento activo." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Posteriormente, los datos pasarán a un sistema de &quot;congeladora&quot; por 3 años más." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Tras este período, los usuarios serán notificados antes de la eliminación permanente de su información." />
                    </ListItem>
                  </List>
                </>
              }
            />
            <PolicySection
              id="third-party"
              title="5. Comunicación de los Datos a Terceros"
              content={
                <Typography variant="body1">
                  No compartimos datos personales con terceros, salvo que sea necesario para el cumplimiento de obligaciones legales o cuando el usuario haya otorgado su consentimiento expreso.
                </Typography>
              }
            />
            <PolicySection
              id="rights"
              title="6. Derechos ARCO"
              content={
                <Typography variant="body1">
                  Los usuarios pueden ejercer sus derechos de acceso, rectificación, cancelación y oposición a través del correo <Link href="mailto:chavagalindo@live.com.mx">chavagalindo@live.com.mx</Link>, desde el correo electrónico registrado en la plataforma.
                </Typography>
              }
            />
            <PolicySection
              id="security"
              title="7. Seguridad de la Información"
              content={
                <Typography variant="body1">
                  En InvoiceMx implementamos medidas de seguridad técnicas y organizativas para proteger los datos personales. Todos los datos sensibles están encriptados y almacenados en bases de datos seguras. El acceso a estos datos está estrictamente limitado.
                </Typography>
              }
            />
            <PolicySection
              id="cookies"
              title="8. Uso de Cookies"
              content={
                <Typography variant="body1" paragraph>
                  La plataforma solo utiliza cookies necesarias para el mantenimiento de la sesión del usuario. No se usan cookies de terceros ni para seguimiento de comportamiento fuera de la plataforma.
                </Typography>
              }
            />
            <PolicySection
              id="minors"
              title="9. Uso por Menores de Edad"
              content={
                <Typography variant="body1">
                  El uso de InvoiceMx está destinado únicamente a personas mayores de edad que cuenten con su llave fiscal proporcionada por el SAT. No obstante, si un menor de edad proporciona sus datos, estos serán tratados conforme a esta política de privacidad.
                </Typography>
              }
            />
            <PolicySection
              id="updates"
              title="10. Actualización de la Política de Privacidad"
              content={
                <Typography variant="body1">
                  InvoiceMx se reserva el derecho de modificar esta política de privacidad. Cualquier cambio será notificado a los usuarios a través de la plataforma, sitio web y/o correo electrónico.
                </Typography>
              }
            />
          </Box>

          <Box display="flex" justifyContent="space-between" mt={4}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => router.back()}
              sx={{
                color: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                }
              }}
            >
              {t('goBack')}
            </Button>

            {!isMobile && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                sx={{
                  color: theme.palette.secondary.main,
                  borderColor: theme.palette.secondary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.secondary.contrastText,
                  }
                }}
              >
                {t('backToTop')}
              </Button>
            )}
          </Box>

        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default PrivacyPolicyPage;