import MapRender from './components/mapRender/MapRender';
import Login from './components/login/login';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthCallback } from './components/auth/AuthCallback';
import CompletarPerfil from './components/profile/CompleteProfile';

function App() {
  return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MapRender />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth-callback" element={<AuthCallback />} />
      <Route path="/completar-perfil" element={<CompletarPerfil />} />
      <Route path="/dashboard" element={<MapRender />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App;