import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './security/AuthContext.jsx';
import { AlertProvider } from './alerts/AlertContext.jsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <AuthProvider>
        <AlertProvider>
          <App />
        </AlertProvider>
      </AuthProvider>
    </StrictMode>
  </QueryClientProvider>
)
