import { useState } from 'react';
import { Box, Button, Container, Heading, Text, useToast } from '@chakra-ui/react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const testBackendConnection = async () => {
    setIsLoading(true);
    try {
      const backendUrl = 'https://proyecto-backend-36oi.onrender.com';
      const response = await fetch(`${backendUrl}/api/health`);
      const data = await response.json();

      toast({
        title: response.ok ? 'Conexión exitosa' : 'Error de conexión',
        description: data.message || (response.ok ? 'Sistema conectado' : 'Error al conectar'),
        status: response.ok ? 'success' : 'error',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error de red',
        description: 'No se pudo establecer conexión con el servidor',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="container.md" py={10}>
      <Box textAlign="center">
        <Heading as="h1" size="xl" mb={6}>
          Validación de Arquitectura
        </Heading>
        <Text fontSize="lg" color="gray.600" mb={8}>
          Prueba de concepto - Comunicación Frontend/Backend
        </Text>
        <Button
          colorScheme="teal"
          size="lg"
          onClick={testBackendConnection}
          isLoading={isLoading}
          loadingText="Verificando..."
        >
          Probar Conexión
        </Button>
      </Box>
    </Container>
  );

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
