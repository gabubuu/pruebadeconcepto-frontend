import { useState } from 'react';
import './App.css';

function App() {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');

  const testBackendConnection = async () => {
    try {
      const backendUrl = 'https://proyecto-backend-36oi.onrender.com';
      const response = await fetch(`${backendUrl}/api/health`);
      const data = await response.json();

      if (response.ok) {
        setStatus('ok');
        setMessage(data.message || '¡Sistema conectado!');
      } else {
        setStatus('error');
        setMessage(data.message || 'Error al conectar con el sistema.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Error de red o el backend no está disponible.');
      console.error('Error al llamar al backend:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Prueba de conexión del prototipo</h1>
        <button onClick={testBackendConnection}>
          Probar conexión del sistema
        </button>
        {status && (
          <p style={{ color: status === 'ok' ? 'green' : 'red', fontWeight: 'bold' }}>
            {message}
          </p>
        )}
      </header>
    </div>
  );
}

export default App;
