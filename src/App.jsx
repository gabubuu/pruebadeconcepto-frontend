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
import { 
  NetworkCheck, 
  Storage, 
  Cloud, 
  Computer,
  ArrowForward,
  Security,
  Code
} from '@mui/icons-material';

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
              color: '#ffffff',
              textShadow: '0 0 10px rgba(255,255,255,0.3)',
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
              <Computer sx={{ fontSize: 40, color: flowStep >= 1 ? '#ffffff' : '#333333' }} />
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
              <Cloud sx={{ fontSize: 40, color: flowStep >= 2 ? '#ffffff' : '#333333' }} />
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
              <Storage sx={{ fontSize: 40, color: flowStep >= 3 ? '#ffffff' : '#333333' }} />
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
              background: 'linear-gradient(45deg, #404040 30%, #1a1a1a 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1a1a1a 30%, #404040 90%)',
              }
            }}
          >
            {isLoading ? 'Verificando...' : 'Probar Conexión'}
          </Button>
        </Box>

        <Box sx={{ mt: 6, px: 2 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
            Recorrido de la Petición
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '10%',
              right: '10%',
              height: '2px',
              background: 'linear-gradient(90deg, #333333 30%, #1a1a1a 90%)',
              zIndex: 0,
            }
          }}>
            <Paper sx={{ 
              p: 2, 
              zIndex: 1, 
              background: 'linear-gradient(145deg, #2a2a2a 0%, #121212 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: '120px',
              border: '1px solid #333'
            }}>
              <Code sx={{ color: '#666', mb: 1 }} />
              <Typography variant="caption" color="primary">
                Frontend en Vercel
              </Typography>
            </Paper>

            <Box sx={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ArrowForward sx={{ color: '#404040' }} />
              <Typography variant="caption" color="text.secondary">
                API Call
              </Typography>
            </Box>

            <Paper sx={{ 
              p: 2, 
              zIndex: 1, 
              background: 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: '120px'
            }}>
              <Security sx={{ color: '#666', mb: 1 }} />
              <Typography variant="caption" color="primary">
                SSL/TLS
              </Typography>
            </Paper>

            <Box sx={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ArrowForward sx={{ color: '#00e5ff' }} />
              <Typography variant="caption" color="text.secondary">
                Conexión Interna
              </Typography>
            </Box>

            <Paper sx={{ 
              p: 2, 
              zIndex: 1, 
              background: 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: '120px'
            }}>
              <Cloud sx={{ color: '#666', mb: 1 }} />
              <Typography variant="caption" color="primary">
                Backend en Render
              </Typography>
            </Paper>
          </Box>
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