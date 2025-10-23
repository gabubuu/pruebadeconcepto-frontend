import { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  CircularProgress,
  Snackbar,
  Alert,
  Paper,
  Fade,
  LinearProgress
} from '@mui/material';
import { NetworkCheck, Storage, Cloud, Computer } from '@mui/icons-material';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [flowStep, setFlowStep] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const testBackendConnection = async () => {
    setIsLoading(true);
    setFlowStep(1); // Iniciando conexión
    try {
      const backendUrl = 'https://proyecto-backend-36oi.onrender.com';
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay para ver la animación
      setFlowStep(2); // Conectando con el backend
      const response = await fetch(`${backendUrl}/api/health`);
      const data = await response.json();
      setFlowStep(3); // Conexión con la base de datos

      setSnackbar({
        open: true,
        message: data.message || (response.ok ? 'Sistema conectado' : 'Error al conectar'),
        severity: response.ok ? 'success' : 'error'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error de conexión con el servidor',
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper 
        elevation={24} 
        sx={{ 
          p: 4, 
          background: 'linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%)',
          borderRadius: 4,
        }}
      >
        <Box textAlign="center" mb={6}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ 
              background: 'linear-gradient(45deg, #00ff9d 30%, #00e5ff 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}
          >
            Validación de Arquitectura
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Prueba de concepto - Comunicación Frontend/Backend
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, px: 4 }}>
          <Fade in={true}>
            <Paper 
              elevation={flowStep >= 1 ? 12 : 1} 
              sx={{ 
                p: 2, 
                textAlign: 'center',
                background: flowStep >= 1 ? 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 100%)' : 'inherit',
                transition: 'all 0.3s ease'
              }}
            >
              <Computer sx={{ fontSize: 40, color: flowStep >= 1 ? '#00ff9d' : 'grey.500' }} />
              <Typography variant="body2" color={flowStep >= 1 ? 'primary' : 'text.secondary'}>
                Frontend
              </Typography>
            </Paper>
          </Fade>

          <Fade in={true} style={{ transitionDelay: '100ms' }}>
            <Paper 
              elevation={flowStep >= 2 ? 12 : 1}
              sx={{ 
                p: 2, 
                textAlign: 'center',
                background: flowStep >= 2 ? 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 100%)' : 'inherit'
              }}
            >
              <Cloud sx={{ fontSize: 40, color: flowStep >= 2 ? '#00ff9d' : 'grey.500' }} />
              <Typography variant="body2" color={flowStep >= 2 ? 'primary' : 'text.secondary'}>
                Backend
              </Typography>
            </Paper>
          </Fade>

          <Fade in={true} style={{ transitionDelay: '200ms' }}>
            <Paper 
              elevation={flowStep >= 3 ? 12 : 1}
              sx={{ 
                p: 2, 
                textAlign: 'center',
                background: flowStep >= 3 ? 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 100%)' : 'inherit'
              }}
            >
              <Storage sx={{ fontSize: 40, color: flowStep >= 3 ? '#00ff9d' : 'grey.500' }} />
              <Typography variant="body2" color={flowStep >= 3 ? 'primary' : 'text.secondary'}>
                Base de Datos
              </Typography>
            </Paper>
          </Fade>
        </Box>

        {isLoading && (
          <Box sx={{ width: '100%', mb: 4 }}>
            <LinearProgress color="primary" />
          </Box>
        )}

        <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={testBackendConnection}
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <NetworkCheck />}
            sx={{ 
              mt: 2,
              px: 4,
              py: 1.5,
              borderRadius: 2,
              background: 'linear-gradient(45deg, #00ff9d 30%, #00e5ff 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #00e5ff 30%, #00ff9d 90%)',
              }
            }}
          >
            {isLoading ? 'Verificando...' : 'Probar Conexión'}
          </Button>
        </Box>
      </Paper>

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
    </Container>
  );
}