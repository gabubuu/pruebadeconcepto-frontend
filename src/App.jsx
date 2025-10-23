import React from 'react';

export default function App() {

  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Validación de Arquitectura</h1>
      <p>Prueba de concepto - Comunicación Frontend/Backend</p>
      <button 
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
        onClick={() => alert('¡Botón funcionando!')}
      >
        Probar Conexión
      </button>
    </div>
  );
}