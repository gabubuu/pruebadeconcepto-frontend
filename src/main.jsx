import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import App from './App.jsx'

const rootElement = document.getElementById('root')
createRoot(rootElement).render(
  <StrictMode>
    <ColorModeScript />
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </StrictMode>,
)
