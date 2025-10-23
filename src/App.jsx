import { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { NetworkCheck } from '@mui/icons-material';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
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
    try {
      const backendUrl = 'https://proyecto-backend-36oi.onrender.com';
      const response = await fetch(`${backendUrl}/api/health`);
      const data = await response.json();

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
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box textAlign="center">
        <Typography variant="h3" component="h1" gutterBottom>
          Validación de Arquitectura
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Prueba de concepto - Comunicación Frontend/Backend
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={testBackendConnection}
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <NetworkCheck />}
          sx={{ mt: 4 }}
        >
          {isLoading ? 'Verificando...' : 'Probar Conexión'}
        </Button>
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
    </Container>
  );
}