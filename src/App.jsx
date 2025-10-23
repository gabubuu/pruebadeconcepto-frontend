import { useState } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  Button,
  Text,
  Container,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
} from '@chakra-ui/react';
// Eliminamos la importación de CSS para evitar conflictos con Chakra UI

function App() {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const testBackendConnection = async () => {
    setIsLoading(true);
    try {
      const backendUrl = 'https://proyecto-backend-36oi.onrender.com';
      const response = await fetch(`${backendUrl}/api/health`);
      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || '¡Sistema conectado exitosamente!');
        toast({
          title: 'Conexión exitosa',
          description: 'El sistema está funcionando correctamente',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        setStatus('error');
        setMessage(data.message || 'Error al conectar con el sistema.');
        toast({
          title: 'Error de conexión',
          description: 'No se pudo establecer conexión con el sistema',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      setStatus('error');
      setMessage('Error de red o el backend no está disponible.');
      toast({
        title: 'Error de red',
        description: 'No se pudo establecer conexión con el servidor',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Error al llamar al backend:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Box textAlign="center">
          <Heading mb={6}>Validación de Arquitectura Distribuida</Heading>
            <Text fontSize="lg" color="gray.600" mb={8}>
              Esta prueba de concepto demuestra la comunicación entre el frontend y el backend
            </Text>
            <Button
              colorScheme="teal"
              size="lg"
              onClick={testBackendConnection}
              isLoading={isLoading}
              loadingText="Verificando conexión..."
              spinnerPlacement="start"
            >
              Verificar Conexión del Sistema
            </Button>
          </Box>

          {status && (
            <Alert
              status={status}
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              borderRadius="md"
              p={6}
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                {status === 'success' ? '¡Conexión Exitosa!' : 'Error de Conexión'}
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                {message}
              </AlertDescription>
            </Alert>
          )}
        </VStack>
      </Container>
  );
}

export default App;
